import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { PaymentType } from "src/database/entities/payment/payment.entity";
import { UserPaymentMethod } from "src/database/entities/payment/user-payment-method.entity";
import { User } from "src/database/entities/user/user.entity";
import { EntityManager, Repository } from "typeorm";
import { UserPaymentDto } from "../dto/payment.dto";
import { errorMessages } from "src/errors/custom";
import { successObject } from "src/common/helper/sucess-response.interceptor";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(UserPaymentMethod)
        private readonly userPaymentRepository: Repository<UserPaymentMethod>,
        @InjectRepository(PaymentType)
        private readonly paymentTypeRepository: Repository<PaymentType>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async getUserPayment(user: User): Promise<UserPaymentMethod> {
        const userPaymentMethod: UserPaymentMethod = await this.userPaymentRepository.findOne({
            where: { user },
            relations: ['paymentType']
        })
        return userPaymentMethod;
    }
    async addUserPayment(user: User, data: UserPaymentDto): Promise<UserPaymentMethod> {
        const paymentType: PaymentType = await this.paymentTypeRepository.findOne({ where: { value: data.paymentType } })
        if (!paymentType) {
            throw new NotFoundException(errorMessages.paymentType.notFound);
        }
        const userPaymentMethod: UserPaymentMethod = await this.userPaymentRepository.create({
            user,
            paymentType,
            provider: data.provider,
            expiry_date: data.expiry_date,
            account_number: data.account_number
        });
        await this.userPaymentRepository.save(userPaymentMethod);
        return userPaymentMethod;
    }

    public async editUserPayment(id: number, data: UserPaymentDto): Promise<UserPaymentMethod> {
        // Find the payment type by its value
        const paymentType = await this.paymentTypeRepository.findOne({ where: { value: data.paymentType } });
        if (!paymentType) {
            throw new NotFoundException('Payment type not found');
        }

        // Find the existing user payment method by its ID
        const userPaymentMethod = await this.userPaymentRepository.findOne({ where: { id } });
        if (!userPaymentMethod) {
            throw new NotFoundException('User payment method not found');
        }

        // Update the user payment method fields
        userPaymentMethod.paymentType = paymentType;
        userPaymentMethod.provider = data.provider;
        userPaymentMethod.expiry_date = data.expiry_date;
        userPaymentMethod.account_number = data.account_number;

        // Save the updated user payment method
        await this.userPaymentRepository.save(userPaymentMethod);

        return userPaymentMethod;
    }

    async setPaymentMethod(id: number): Promise<UserPaymentMethod> {
        // Find the existing user payment method by its ID
        const userPaymentMethod = await this.userPaymentRepository.findOne({ where: { id } });
        if (!userPaymentMethod) {
            throw new NotFoundException('User payment method not found');
        }

        userPaymentMethod.is_default = true;

        await this.userPaymentRepository.save(userPaymentMethod);

        return userPaymentMethod;
    }

    async deleteUserPayment(id: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(UserPaymentDto)
            .where('id = :id', { id })
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.payment.notFound);

        return successObject;
    }

    async deletePaymentType(id: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(PaymentType)
            .where('id = :id', { id })
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.paymentType.notFound);

        return successObject;
    }

}