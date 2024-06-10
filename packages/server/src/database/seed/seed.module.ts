import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { RolesSeeder } from './seeders/role.seeder';
import { Role } from '../entities/role/role.entity';
import { User } from '../entities/user/user.entity';
import { TypeOrmConfigService } from '../typeorm/typeorm.service';
import { UserSeeder } from './seeders/user.seeder';
import { AdminSeeder } from './seeders/admin.seeder';
import { CountrySeeder } from './seeders/country.seeder';
import { Country } from '../entities/country/country.entity';
import { Address } from '../entities/address/address.entity';
import { AddressSeeder } from './seeders/address.seeder';
import { PaymentType } from '../entities/payment/payment.entity';
import { PaymentTypeSeeder } from './seeders/payment-type.seeder';
import { UserPaymentMethod } from '../entities/payment/user-payment-method.entity';
import { UserPaymentMethodSeeder } from './seeders/user-payment.seeder';
import { Category } from '../entities/category/category.entity';
import { Product } from '../entities/product/product.entity';
import { CategorySeederSeeder } from './seeders/category.seeder';
import { ProductSeeder } from './seeders/product.seeder';
import { ProductItem } from '../entities/product/product_item.entity';
import { ShoppingCart } from '../entities/cart/cart.entity';
import { ShoppingCartItem } from '../entities/cart/cart_item.entity';
import { ShoppingCartItemSeeder } from './seeders/cart-item.seeder';
import { Variation } from '../entities/variation/variation.entity';
import { VariationOption } from '../entities/variation/variation_option.entity';
import { VariationSeeder } from './seeders/variation.seeder';
import { VariationOptionSeeder } from './seeders/variation-option.seeder';
import { Coupon } from '../entities/coupon/coupon.entity';
import { ShippingMethod } from '../entities/ship_method/ship_method.entity';
import { OrderStatus } from '../entities/order/order_status.entity';
import { CouponSeeder } from './seeders/coupon.seeder';
import { ShippingMethodSeeder } from './seeders/shipping.seeder';
import { OrderStatusSeeder } from './seeders/order_status.seeder';
import { ShopOrderSeeder } from './seeders/order.seeder';
import { ShopOrder } from '../entities/order/order.entity';
import { OrderLine } from '../entities/order/order_line.entity';
import { OrderLineSeeder } from './seeders/order_line.seeder';
import { UserReview } from '../entities/review/review.entity';
import { UserReviewSeeder } from './seeders/review.seeder';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([
      Role,
      User,
      Country,
      Address,
      PaymentType,
      UserPaymentMethod,
      Category,
      Product,
      ProductItem,
      ShoppingCart,
      ShoppingCartItem,
      Variation,
      VariationOption,
      Coupon,
      ShippingMethod,
      OrderStatus,
      ShopOrder,
      OrderLine,
      UserReview
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    SeedService,
    RolesSeeder,
    UserSeeder,
    AdminSeeder,
    CountrySeeder,
    AddressSeeder,
    PaymentTypeSeeder,
    UserPaymentMethodSeeder,
    CategorySeederSeeder,
    ProductSeeder,
    ShoppingCartItemSeeder,
    VariationSeeder,
    VariationOptionSeeder,
    CouponSeeder,
    ShippingMethodSeeder,
    OrderStatusSeeder,
    ShopOrderSeeder,
    OrderLineSeeder,
    UserReviewSeeder
  ],
})
export class SeedModule {}