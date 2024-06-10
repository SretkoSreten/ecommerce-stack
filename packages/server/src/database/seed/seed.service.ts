import { Injectable, Logger } from '@nestjs/common';
import { Promise as Bluebird } from 'bluebird';
import { SeederInterface } from './seed.interference';
import { RolesSeeder } from './seeders/role.seeder';
import { UserSeeder } from './seeders/user.seeder';
import { AdminSeeder } from './seeders/admin.seeder';
import { CountrySeeder } from './seeders/country.seeder';
import { AddressSeeder } from './seeders/address.seeder';
import { PaymentTypeSeeder } from './seeders/payment-type.seeder';
import { UserPaymentMethod } from '../entities/payment/user-payment-method.entity';
import { UserPaymentMethodSeeder } from './seeders/user-payment.seeder';
import { CategorySeederSeeder } from './seeders/category.seeder';
import { ProductSeeder } from './seeders/product.seeder';
import { ShoppingCart } from '../entities/cart/cart.entity';
import { ShoppingCartItemSeeder } from './seeders/cart-item.seeder';
import { VariationSeeder } from './seeders/variation.seeder';
import { VariationOptionSeeder } from './seeders/variation-option.seeder';
import { CouponSeeder } from './seeders/coupon.seeder';
import { OrderStatus } from '../entities/order/order_status.entity';
import { ShippingMethod } from '../entities/ship_method/ship_method.entity';
import { ShippingMethodSeeder } from './seeders/shipping.seeder';
import { OrderStatusSeeder } from './seeders/order_status.seeder';
import { ShopOrderSeeder } from './seeders/order.seeder';
import { OrderLineSeeder } from './seeders/order_line.seeder';
import { UserReviewSeeder } from './seeders/review.seeder';

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];
  private readonly logger = new Logger(SeedService.name);

  constructor(
    rolesSeeder: RolesSeeder,
    userSeeder: UserSeeder,
    adminSeeder: AdminSeeder,
    countrySeeder: CountrySeeder,
    addressSeeder: AddressSeeder,
    paymentTypeSeeder: PaymentTypeSeeder,
    userPaymentSeeder: UserPaymentMethodSeeder,
    categorySeeder: CategorySeederSeeder,
    productSeeder: ProductSeeder,
    cartItemSeeder: ShoppingCartItemSeeder,
    variationSeeder: VariationSeeder,
    variationOptionSeeder: VariationOptionSeeder,
    couponSeeder: CouponSeeder,
    orderStatusSeeder: OrderStatusSeeder,
    shippingSeeder: ShippingMethodSeeder,
    shopOrderSeeder: ShopOrderSeeder,
    orderLineSeeder: OrderLineSeeder,
    userReviewSeeder: UserReviewSeeder
  ) {
    this.seeders = [
      rolesSeeder,
      userSeeder,
      adminSeeder,
      countrySeeder,
      addressSeeder,
      paymentTypeSeeder,
      userPaymentSeeder,
      categorySeeder, 
      variationSeeder,
      variationOptionSeeder,
      productSeeder,
      cartItemSeeder,
      couponSeeder,
      orderStatusSeeder,
      shippingSeeder,
      shopOrderSeeder,
      orderLineSeeder,
      userReviewSeeder,
    ];
  }
  async seed(){
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
       await seeder.seed(); 
    });
  }
}