import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Coupon } from "src/database/entities/coupon/coupon.entity";
import { EntityManager, Repository } from "typeorm";
import { CreateCouponDto } from "../dto/create-coupon.dto";
import { errorMessages } from "src/errors/custom";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { UpdateCouponDto } from "../dto/update-coupon.dto";
import { User } from "src/database/entities/user/user.entity";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";

@Injectable()
export class CouponService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>
    ) { }

    async getCoupon(id: number) {
        return this.couponRepository.findOne({ where: { id } });
    }


    async createCoupon(data: CreateCouponDto): Promise<Coupon> {
        const coupon: Coupon = this.couponRepository.create(data);
        await this.couponRepository.save(coupon);
        return coupon;
    }

    async updateCoupon(id: number, data: UpdateCouponDto) {
        await this.entityManager
            .createQueryBuilder()
            .update(Coupon)
            .set(data)
            .where("id = :id", { id })
            .execute()
    }

    async deleteCoupon(id: number) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(Coupon)
            .where('id = :id', { id })
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return successObject;
    }
}