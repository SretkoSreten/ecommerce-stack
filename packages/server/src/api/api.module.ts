import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ErrorsFilter } from 'src/errors/errors.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SucessResponseInterceptor } from "src/common/helper/sucess-response.interceptor";
import { ProductModule } from "./product/product.module";
import { VariationModule } from "./variation/variation.module";
import { CategoryModule } from "./category/category.module";
import { CartModule } from "./cart/cart.module";
import { PaymentModule } from "./payment/payment.module";
import { CouponModule } from "./coupon/coupon.module";
import { OrderModule } from "./order/order.module";
import { ReviewModule } from "./reviews/review.module";
import { ShippingModule } from "./shipping/shipping.module";

@Module({
    imports: [
        UserModule,
        AuthModule,
        ProductModule,
        VariationModule,
        CategoryModule,
        CartModule,
        PaymentModule,
        CouponModule,
        OrderModule,
        ReviewModule,
        ShippingModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: SucessResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: ErrorsFilter,
        },
    ],
})
export class ApiModule { }