import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { PaymentType } from "src/database/entities/payment/payment.entity";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { User } from "src/database/entities/user/user.entity";
import { EntityManager, Not, Repository } from "typeorm";
import { UserPaymentDto } from "../dto/payment.dto";
import { errorMessages } from "src/errors/custom";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(UserPaymentMethod)
    private readonly userPaymentRepository: Repository<UserPaymentMethod>,
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepository: Repository<PaymentType>,
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

  async getUserPayments(user: User): Promise<UserPaymentMethod[]> {
    const userPaymentMethods: UserPaymentMethod[] = await this.userPaymentRepository.find(
      {
        where: { user: {id: user.id} },
        relations: ["paymentType"],
      }
    );
    return userPaymentMethods;
  }

  async getPayment(id: number): Promise<UserPaymentMethod> {
    const userPaymentMethod: UserPaymentMethod = await this.userPaymentRepository.findOne(
      {
        where: { id },
        relations: ["paymentType"],
      }
    );
    return userPaymentMethod;
  }

  async addUserPayment(
    user: User,
    data: UserPaymentDto
  ): Promise<UserPaymentMethod> {
    // Use a Stripe test token instead of raw card details for testing purposes
    // For example, use `tok_visa` which is a test token for Visa card
    const testToken = "tok_visa";
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: "card",
      card: {
        token: testToken,
      },
      billing_details: {
        name: data.account_name
      },
    });

    // Attach the payment method to the customer (Stripe customer ID)
    await this.stripe.paymentMethods.attach(paymentMethod.id, {
      customer: user.stripeCustomerId,
    });

    // Retrieve the payment method to get additional details
    const retrievedPaymentMethod = await this.stripe.paymentMethods.retrieve(
      paymentMethod.id
    );

    // Find the payment type based on the card brand
    const paymentType: PaymentType = await this.paymentTypeRepository.findOne({
      where: { value: retrievedPaymentMethod.card.brand },
    });

    // Check if the payment type was found
    if (!paymentType) {
      throw new NotFoundException("Payment type not found");
    }

    // Create and save the user payment method in the database
    const userPaymentMethod = this.userPaymentRepository.create({
      user,
      paymentType,
      account_name: data.account_name,
      expiry_date: `${retrievedPaymentMethod.card.exp_month}/${retrievedPaymentMethod.card.exp_year}`,
      card_number: retrievedPaymentMethod.card.last4, // Using card.last4 for the last four digits of the card
      payment_method_id: retrievedPaymentMethod.id,
    });

    await this.userPaymentRepository.save(userPaymentMethod);
    return userPaymentMethod;
  }

  public async editUserPayment(
    id: number,
    data: UserPaymentDto
  ): Promise<UserPaymentMethod> {
    // Find the payment type by its value
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { value: data.paymentType },
    });
    if (!paymentType) {
      throw new NotFoundException("Payment type not found");
    }

    // Find the existing user payment method by its ID
    const userPaymentMethod = await this.userPaymentRepository.findOne({
      where: { id },
    });
    if (!userPaymentMethod) {
      throw new NotFoundException("User payment method not found");
    }

    // Update the user payment method fields
    userPaymentMethod.paymentType = paymentType;
    userPaymentMethod.expiry_date = data.expiry_date;
    userPaymentMethod.card_number = data.card_number;
    userPaymentMethod.account_name = data.account_name;
    // Save the updated user payment method
    await this.userPaymentRepository.save(userPaymentMethod);

    return userPaymentMethod;
  }

  async selectPayment(user: User, id: number): Promise<any> {
    try {
      // Find the selected payment method
      const userPaymentFound = await this.userPaymentRepository.findOne({
        where: { id, user: {id: user.id} },
      });

      if (!userPaymentFound) {
        throw new NotFoundException(`Payment method with ID ${id} not found for the user`);
      }

      // Ensure the selected payment method is not already the default
      if (userPaymentFound.is_default) {
        throw new NotFoundException('Payment method is already default');
      }

      // Update the default payment method for the Stripe customer
      await this.stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: userPaymentFound.payment_method_id,
        },
      });

      // Start a transaction to ensure atomicity
      await this.userPaymentRepository.manager.transaction(
        async (transactionalEntityManager) => {
          // Update all other payment methods of the user to not be the default
          await transactionalEntityManager.update(
            UserPaymentMethod,
            { user, id: Not(id) },
            { is_default: false }
          );

          // Update the selected payment method to be the default
          await transactionalEntityManager.update(
            UserPaymentMethod,
            { id },
            { is_default: true }
          );
        }
      );

      return successObject;

    } catch (error) {
      console.error('Error selecting payment:', error);
      throw new Error('Unable to select payment');
    }
  }

  async deleteUserPayment(
    id: number
  ): Promise<any> {
    // Retrieve the UserPaymentMethod entity
    const userPaymentMethod = await this.userPaymentRepository.findOne({
      where: { id },
    });

    if (!userPaymentMethod) {
      throw new NotFoundException("Payment method not found");
    }

    try {
      await this.stripe.paymentMethods.detach(
        userPaymentMethod.payment_method_id
      );
    } catch (error) {
      throw new NotFoundException(
        "Failed to delete payment method from Stripe"
      );
    }

    // Delete the payment method from the database
    const result = await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(UserPaymentMethod)
      .where("id = :id", { id })
      .execute();

    if (result.affected < 1) {
      throw new NotFoundException(
        "Failed to delete payment method from database"
      );
    }

    return successObject;
  }

  async deletePaymentType(id: number) {
    const result = await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(PaymentType)
      .where("id = :id", { id })
      .execute();

    if (result.affected < 1)
      throw new NotFoundException(errorMessages.paymentType.notFound);

    return successObject;
  }
}
