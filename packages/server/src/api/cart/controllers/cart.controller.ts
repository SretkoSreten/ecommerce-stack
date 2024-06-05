import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { Auth } from 'src/api/auth/guards/auth.decorator';
import { Roles } from 'src/api/role/role.enum';
import { CurrentUser } from 'src/api/auth/guards/user.decorator';
import { User } from 'src/database/entities/user/user.entity';
import { AddToCartDto } from '../dto/add-cart.dto';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('user')
    getUserCart(
        @CurrentUser() user: User
    ) {
        return this.cartService.getUserCart(user);
    }

    
    @Auth(Roles.USER, Roles.ADMIN)
    @Get('user/items')
    getUserCartItems(
        @CurrentUser() user: User
    ) {
        return this.cartService.getUserCartItems(user);
    }

    @Auth(Roles.ADMIN, Roles.USER)
    @Delete('clear')
    clearCart(
        @CurrentUser() user: User
    ) {
        return this.cartService.clearCart(user);
    }



    @Auth(Roles.USER, Roles.ADMIN)
    @Get(':id')
    getCart(
        @Param() {id}: FindOneParams,
    ) {
        return this.cartService.getCart(id);
    }

    @Auth(Roles.ADMIN, Roles.USER)
    @Delete(':id')
    deleteCart(
        @Param() {id}: FindOneParams,
    ) {
        return this.cartService.deleteCart(id);
    }

    @Auth(Roles.ADMIN, Roles.USER)
    @Delete('item/:id')
    deleteCartItem(
        @Param() {id}: FindOneParams,
    ) {
        return this.cartService.deleteProductFromCart(id);
    }


    @Auth(Roles.ADMIN, Roles.USER)
    @Post('add/:id')
    addToCart(
        @CurrentUser() user: User,
        @Param() {id}: FindOneParams,
        @Body() {qty}: AddToCartDto
    ) {
        return this.cartService.addProductToCart(user, id, qty);
    }

    @Auth(Roles.ADMIN, Roles.USER)
    @Get('remove/:id')
    removeFromCart(
        @Param() {id}: FindOneParams,
    ) {
        return this.cartService.removeProductFromCart(id);
    }
}
