import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto, UpdateReviewDto } from '../dto/review.dto';
import { UserReview } from 'src/database/entities/review/review.entity';
import { User } from 'src/database/entities/user/user.entity';
import { ShopOrder } from 'src/database/entities/order/order.entity';
import { OrderLine } from 'src/database/entities/order/order_line.entity';
import { errorMessages } from 'src/errors/custom';
import { Product } from 'src/database/entities/product/product.entity';
import { ProductItem } from 'src/database/entities/product/product_item.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(UserReview)
        private readonly reviewRepository: Repository<UserReview>,
        @InjectRepository(OrderLine)
        private readonly orderLineRepository: Repository<OrderLine>,
        @InjectRepository(ProductItem)
        private readonly productRepository: Repository<ProductItem>
    ) {}

    async createReview(user: User, productId:number, data: CreateReviewDto): Promise<UserReview> {
        const product = await this.productRepository.findOne({ 
            where: { id: productId },
            relations: ['orderLines', 'orderLines.order', 'orderLines.order.user']
        });

        if (product.orderLines.length == 0){
            throw new NotFoundException(errorMessages.order.notOrderUser)
        }
        const isOrderUser = product.orderLines.find((orderLine) => orderLine.order.user.id == user.id);

        if (!isOrderUser){
            throw new NotFoundException(errorMessages.order.notOrderUser)
        }

        const orderLine = await this.orderLineRepository.findOne({
            where: {order: isOrderUser.order, product}
        })

        const review = this.reviewRepository.create({
            user: user,
            rating_value: data.rating_value,
            comment: data.comment,
            orderLine
        });

        return await this.reviewRepository.save(review);
    }

    async getReview(id: number): Promise<UserReview> {
        const review = await this.reviewRepository.findOne({ where: { id }, relations: ['orderLine', 'user'] });
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return review;
    }

    async updateReview(id: number, data: UpdateReviewDto): Promise<UserReview> {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new NotFoundException('Review not found');
        }

        if (data.rating_value !== undefined) {
            review.rating_value = data.rating_value;
        }
        if (data.comment !== undefined) {
            review.comment = data.comment;
        }

        await this.reviewRepository.save(review);
        return review;
    }

    async deleteReview(id: number): Promise<void> {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) {
            throw new NotFoundException('Review not found');
        }

        await this.reviewRepository.remove(review);
    }
}
