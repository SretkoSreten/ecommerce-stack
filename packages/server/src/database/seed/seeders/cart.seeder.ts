import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/database/entities/cart/cart.entity';
import { User } from 'src/database/entities/user/user.entity';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class ShoppingCartSeeder {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly shoppingCartRepository: Repository<ShoppingCart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly entityManager: EntityManager,
    ) { }

    private generateRandomUser(users: User[]): User {
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
    }

    private async generateShoppingCartData(users: User[]): Promise<Partial<ShoppingCart>> {
        const user = this.generateRandomUser(users);

        return {
            user: user,
        };
    }

    async seed() {
        const count: number = await this.shoppingCartRepository.count();
        const CATEGORY_COUNT: number = 50;
        const GENERATE_COUNT = CATEGORY_COUNT - count;
        await this.seedShoppingCarts(GENERATE_COUNT);
    }

    async seedShoppingCarts(numShoppingCarts: number) {
        const users = await this.userRepository.find();

        for (let i = 0; i < numShoppingCarts; i++) {
            const shoppingCartData = await this.generateShoppingCartData(users);
            await this.entityManager.transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.upsert(ShoppingCart, shoppingCartData, { conflictPaths: ['id'] });
            });
        }
    }
}
