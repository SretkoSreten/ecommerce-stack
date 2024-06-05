import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { User } from "src/database/entities/user/user.entity";
import { errorMessages } from "src/errors/custom";
import { EntityManager, Repository } from "typeorm";
import { ShoppingCartItem } from "src/database/entities/cart/cart_item.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";


@Injectable()
export class CartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly cartRepository: Repository<ShoppingCart>,
        @InjectRepository(ShoppingCartItem)
        private readonly cartItemRepository: Repository<ShoppingCartItem>,
        @InjectRepository(ProductItem)
        private readonly productItemRepository: Repository<ProductItem>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async getCart(id: number): Promise<ShoppingCart> {

        const cart = await this.entityManager
            .createQueryBuilder(ShoppingCart, 'cart')
            .leftJoinAndSelect('cart.user', 'user')
            .leftJoinAndSelect('cart.items', 'items')
            .leftJoinAndSelect('items.productItem', 'product')
            .where('user.id = :userId', { userId: id })
            .getOne();

        if (!cart) throw new NotFoundException(errorMessages.cart.notFound);

        return cart;
    }

    async getUserCart(user: User): Promise<ShoppingCart> {

        const cart = await this.entityManager
            .createQueryBuilder(ShoppingCart, 'cart')
            .leftJoinAndSelect('cart.user', 'user')
            .leftJoinAndSelect('cart.items', 'items')
            .leftJoinAndSelect('items.productItem', 'productItem')
            .leftJoinAndSelect('productItem.product', 'product')
            .where('user.id = :userId', { userId: user.id })
            .getOne();

        if (!cart) throw new NotFoundException(errorMessages.cart.notFound);

        return cart;
    }

    async deleteCart(cartItemId: number) {

        const cartItem = await this.entityManager
            .createQueryBuilder(ShoppingCartItem, 'cart_item')
            .leftJoinAndSelect('cart_item.productItem', 'product')
            .where('cart_item.id = :cartId', { cartId: cartItemId })
            .getOne();

        if (!cartItem) {
            throw new NotFoundException(errorMessages.cart.notFound);
        }

        await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(ShoppingCartItem)
            .where('id = :cartId', { cartId: cartItemId })
            .execute();

        cartItem.productItem.qty_in_stock += cartItem.qty;
        await this.productItemRepository.save(cartItem.productItem);

        return successObject;
    }

    public async removeProductFromCart(cartItemId: number) {
        // Find the existing cart item
        const cartItemFound = await this.cartItemRepository.findOne({ where: { id: cartItemId }, relations: ['productItem'] });
        if (!cartItemFound) {
            throw new NotFoundException(`Cart item with ID not found`);
        }

        cartItemFound.qty--;

        await this.cartItemRepository.save(cartItemFound);

        return cartItemFound;
    }

    public async addProductToCart(user: User, productId: number, qty: number = 1): Promise<ShoppingCartItem> {
        // Find the shopping cart by user
        const cart = await this.cartRepository.findOne({ where: { user } });
        if (!cart) {
            throw new NotFoundException(`Shopping cart not found for user with ID ${user.id}`);
        }

        // Find the product by ID
        const product = await this.productItemRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        // Find the existing cart item
        const cartItemFound = await this.cartItemRepository.findOne({ where: { cart, productItem: product } });

        console.log(cartItemFound);

        if (!cartItemFound) {
            // Create a new cart item if it doesn't exist
            const cartItem = this.cartItemRepository.create({
                productItem: product,
                cart: cart,
                qty: qty,
            });

            // Save the new cart item
            await this.cartItemRepository.save(cartItem);

            return cartItem;
        } else {
            // Update the existing cart item quantity and product stock quantity
            cartItemFound.qty += qty;
            await this.productItemRepository.save(product);
            await this.cartItemRepository.save(cartItemFound);

            return cartItemFound;
        }
    }
}