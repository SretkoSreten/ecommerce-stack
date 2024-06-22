import { faker } from '@faker-js/faker';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLine } from '../../entities/order/order_line.entity';
import { UserReview } from '../../entities/review/review.entity';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';

export class UserReviewSeeder {
    constructor(
        @InjectRepository(UserReview)
        private readonly userReviewRepository: Repository<UserReview>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(OrderLine)
        private readonly orderLineRepository: Repository<OrderLine>,
    ) {}

    async seed(){
        const count: number = await this.userReviewRepository.count();
        const REVIEW_COUNT: number = 50;
        const GENERATE_COUNT = REVIEW_COUNT - count;
        await this.seedReviews(GENERATE_COUNT);
    }

    async seedReviews(numReviews: number): Promise<void> {
        const users = await this.userRepository.find();
        const orderLines = await this.orderLineRepository.find();

        if (users.length === 0) {
            console.log("No users found in the repository.");
            return;
        }

        for (let i = 0; i < numReviews; i++) {
            const orderLine = this.getRandomElement(orderLines);
            const user = this.getRandomElement(users);

            if (!orderLine || !user) {
                console.log("Could not find ordered user or user to create UserReview.");
                continue;
            }

            const ratingValue = Math.floor(Math.random() * 5) + 1; // Generate random rating value
            const comment = faker.lorem.sentence(); // Generate random comment

            const userReview = new UserReview();
            userReview.orderLine = orderLine;
            userReview.rating_value = ratingValue;
            userReview.comment = comment;
            userReview.user = user;

            await this.userReviewRepository.save(userReview);
        }
    }

    private getRandomElement<T>(array: T[]): T | undefined {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}
