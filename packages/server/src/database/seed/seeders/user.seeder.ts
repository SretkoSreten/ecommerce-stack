import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user/user.entity";
import { EntityManager, Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Role } from "src/database/entities/role/role.entity";
import { SeederInterface } from "../seed.interference";
import * as bcrypt from "bcrypt";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserSeeder implements SeederInterface {
  private stripe: Stripe;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService
  ) {
    const stripeSecretKey = this.configService.get<string>("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not defined");
    }
    this.stripe = new Stripe(stripeSecretKey);
  }

  async seed() {
    const count: number = await this.userRepository.count();
    const USER_COUNT: number = 20;
    const GENERATE_COUNT = USER_COUNT - count;
    for (let i = 0; i < GENERATE_COUNT; i++) {
      await this.seedUser();
    }
  }

  async seedUser() {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      try {
        const data: Partial<User> = this.generateData();

        const customer = await this.stripe.customers.create({
          email: data.email
        });

        // Hash the password if it exists
        if (data.password) {
          data.password = await bcrypt.hash(data.password, 10);
        }

        // Upsert the user and handle conflict on 'email'
        const result = await transactionalEntityManager.save(User, data);

        // Fetch the newly upserted user by ID
        const user = await transactionalEntityManager
          .getRepository(User)
          .findOne({
            where: { id: result.id },
            relations: ["roles"], // Ensure roles are included
          });

        if (!user) {
          throw new Error("User not found after upsert");
        }

        const cart = await transactionalEntityManager
          .getRepository(ShoppingCart)
          .create({});
        // Fetch the role with name 'User'
        const userRole = await this.roleRepository.findOneBy({ name: "User" });
        user.stripeCustomerId = customer.id;
        user.roles = [userRole];
        cart.user = user;

        await transactionalEntityManager.save(ShoppingCart, cart);
        // Save the user with the new role
        await transactionalEntityManager.save(User, user);
      } catch (error) {
        console.error("Transaction failed:", error);
        throw error; // Optional: re-throw the error to be handled by higher-level logic
      }
    });
  }

  generateData(): Partial<User> {
    return {
      email: faker.internet.email(),
      password: "12345678", // You should hash this before saving to the database
      phone: faker.phone.number(),
      createdAt: new Date(),
      deletedAt: null, // Assuming it's null for active users
      fullname: faker.name.fullName(),
    };
  }
}
