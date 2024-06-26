import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { CreateUserDto } from 'src/api/auth/dto/create-user.dto';
import { Role } from 'src/database/entities/role/role.entity';
import { errorMessages } from 'src/errors/custom';
import { UpdateUserAuthBody } from '../dto/update-user.dto';
import { successObject } from 'src/common/helper/sucess-response.interceptor';
import * as bcrypt from 'bcrypt';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(stripeSecretKey);
  }

  public async createUser(
    body: CreateUserDto,
    ...roles: Role[]
  ): Promise<User> {
    try {
      // Hash the user's password
      body.password = await hash(body.password, 10);

      // Create a new user entity with the provided roles
      const user: Partial<User> = this.repository.create({
        ...body,
        roles,
      });

      // Create a customer in Stripe
      const customer = await this.stripe.customers.create({
        email: body.email,
      });

      // Assign the Stripe customer ID to the user entity
      user.stripeCustomerId = customer.id;

      return await this.repository.save(user);
      
    } catch (error) {
      console.error(
        'An error occurred while creating the user:',
        error.message,
      );
    }
  }

  public async getUserAuth(user: User) {
    return this.repository.findOne({
      where: { id: user.id },
      select: ['fullname', 'email', 'phone'],
    });
  }

  public async updateUserAuth(
    user: User,
    body: UpdateUserAuthBody,
  ): Promise<any> {
    const data = { ...body };
    delete data.confirmPassword;

    // Hash the password if it exists
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      await this.repository.update({ id: user.id }, data);
      return successObject;
    } catch (error) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async deleteAccount(user: User) {
    // Find the user in the local database
    const userFound = await this.repository.findOne({ where: { id: user.id } });

    // Throw a NotFoundException if the user is not found
    if (!userFound) {
      throw new NotFoundException(errorMessages.user.notFound);
    }

    try {
      const customer = await this.stripe.customers.retrieve(
        userFound.stripeCustomerId,
      );
      if (!customer) {
        throw new Error('Customer not found in Stripe');
      }

      const deletedCustomer = await this.stripe.customers.del(
        userFound.stripeCustomerId,
      );
      console.log('Customer deleted successfully:', deletedCustomer);
      return successObject;
    } catch (error) {
      // Handle any errors that occur during Stripe deletion
      console.error('Error deleting Stripe account:', error);
      throw new Error('Failed to delete Stripe account');
    }
  }

  public async findByName(name: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        fullname: name,
      },
    });
    return user;
  }

  public async comparePassword(password, userPassword): Promise<boolean> {
    return compare(password, userPassword);
  }

  public async findById(id: number): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
    return user;
  }

  public async save(user: User) {
    return this.repository.save(user);
  }
}
