import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { ShoppingCart } from "src/database/entities/cart/cart.entity";
import { User } from "src/database/entities/user/user.entity";
import { errorMessages } from "src/errors/custom";
import { EntityManager, Repository } from "typeorm";
import { ShoppingCartItem } from "src/database/entities/cart/cart_item.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";
import { Coupon } from "src/database/entities/coupon/coupon.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly cartRepository: Repository<ShoppingCart>,
    @InjectRepository(ShoppingCartItem)
    private readonly cartItemRepository: Repository<ShoppingCartItem>,
    @InjectRepository(ProductItem)
    private readonly productItemRepository: Repository<ProductItem>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async getCart(id: number): Promise<ShoppingCart> {
    const cart = await this.entityManager
      .createQueryBuilder(ShoppingCart, "cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.items", "items")
      .leftJoinAndSelect("items.productItem", "product")
      .where("user.id = :userId", { userId: id })
      .getOne();

    if (!cart) throw new NotFoundException(errorMessages.cart.notFound);

    return cart;
  }

  async getUserCart(user: User): Promise<ShoppingCart> {
    const cart = await this.entityManager
      .createQueryBuilder(ShoppingCart, "cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.coupon", "coupon")
      .leftJoinAndSelect("cart.items", "items")
      .leftJoinAndSelect("items.productItem", "productItem")
      .leftJoinAndSelect("productItem.product", "product")
      .where("user.id = :userId", { userId: user.id })
      .getOne();

    if (!cart) throw new NotFoundException(errorMessages.cart.notFound);

    return cart;
  }

  async getUserCartItems(user: User): Promise<ShoppingCartItem[]> {
    const cart = await this.entityManager
      .createQueryBuilder(ShoppingCart, "cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.items", "items")
      .leftJoinAndSelect("items.productItem", "products_items")
      .leftJoinAndSelect("products_items.product", "products")
      .where("user.id = :userId", { userId: user.id })
      .getOne();

    if (!cart) throw new NotFoundException(errorMessages.cart.notFound);

    return cart.items;
  }

  async deleteCart(cartItemId: number) {
    const cartItem = await this.entityManager
      .createQueryBuilder(ShoppingCartItem, "cart_item")
      .leftJoinAndSelect("cart_item.productItem", "product")
      .where("cart_item.id = :cartId", { cartId: cartItemId })
      .getOne();

    if (!cartItem) {
      throw new NotFoundException(errorMessages.cart.notFound);
    }

    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(ShoppingCartItem)
      .where("id = :cartId", { cartId: cartItemId })
      .execute();

    cartItem.productItem.qty_in_stock += cartItem.qty;
    await this.productItemRepository.save(cartItem.productItem);

    return successObject;
  }

  public async applyCoupon(
    user: User,
    couponCode: string,
    total: number
  ): Promise<ShoppingCart> {

    const coupon: Coupon = await this.couponRepository.findOne({
      where: { code: couponCode },
    });

    // Check if the coupon exists and is active
    if (!coupon || !coupon.isActive) {
      throw new NotFoundException(errorMessages.coupon.notActive);
    }

    // Fetch the user's shopping cart
    const userCart: ShoppingCart = await this.cartRepository.findOne({
      where: { user },
      relations: ["coupon"],
    });

    // Check if the user's shopping cart exists
    if (!userCart) {
      throw new NotFoundException(errorMessages.coupon.notFound);
    }

    // Validate coupon usage constraints
    if (coupon.expire < new Date()) {
      throw new NotFoundException(errorMessages.coupon.expired);
    }
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      throw new NotFoundException(errorMessages.coupon.limited);
    }
    if (coupon.minOrderValue && total < coupon.minOrderValue) {
      throw new NotFoundException(errorMessages.coupon.minOrderValue);
    }

    // Apply the coupon to the user's cart
    userCart.coupon = coupon;

    // Increment the coupon usage count
    coupon.usageCount += 1;

    // Save the updated cart and coupon
    await this.cartRepository.save(userCart);
    await this.couponRepository.save(coupon);

    return userCart;
  }

  public async removeCoupon(user: User){
    const cart = await this.cartRepository.findOne({ where: { user } });
    if (!cart) {
      throw new NotFoundException(
        `Shopping cart not found for user with ID ${user.id}`
      );
    }
    this.cartRepository.update({user}, {coupon: null})

    return successObject;
  }

  public async clearCart(user: User) {
    const cart = await this.cartRepository.findOne({ where: { user } });
    if (!cart) {
      throw new NotFoundException(
        `Shopping cart not found for user with ID ${user.id}`
      );
    }

    await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(ShoppingCartItem)
      .where("cartId = :cartId", { cartId: cart.id })
      .execute();

    return successObject;
  }

  public async deleteProductFromCart(cartItemId: number) {
    // Find the existing cart item
    const cartItemFound = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ["productItem"],
    });
    if (!cartItemFound) {
      throw new NotFoundException(`Cart item with ID not found`);
    }

    const cartItemRemoved = await this.cartItemRepository.remove(cartItemFound);
    return cartItemRemoved;
  }

  public async removeProductFromCart(cartItemId: number) {
    // Find the existing cart item
    const cartItemFound = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
      relations: ["productItem"],
    });
    if (!cartItemFound) {
      throw new NotFoundException(`Cart item with ID not found`);
    }

    cartItemFound.qty--;

    if (cartItemFound.qty == 0) {
      const cartItemRemoved = await this.cartItemRepository.remove(
        cartItemFound
      );
      return cartItemRemoved;
    }

    await this.cartItemRepository.save(cartItemFound);

    return cartItemFound;
  }

  public async createCart(user: User): Promise<ShoppingCart> {
    const cart: ShoppingCart = this.cartRepository.create({ user });
    await this.cartRepository.save(cart);
    return cart;
  }

  public async addProductToCart(
    user: User,
    productId: number,
    qty: number = 1
  ): Promise<ShoppingCartItem> {
    // Find the shopping cart by user
    const cart = await this.cartRepository.findOne({ where: { user } });
    if (!cart) {
      throw new NotFoundException(
        `Shopping cart not found for user with ID ${user.id}`
      );
    }

    // Find the product by ID
    const product = await this.productItemRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Find the existing cart item
    const cartItemFound = await this.cartItemRepository.findOne({
      where: { cart, productItem: product },
    });

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
