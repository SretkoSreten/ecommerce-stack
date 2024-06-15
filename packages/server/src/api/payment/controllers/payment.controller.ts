import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { Auth } from 'src/api/auth/guards/auth.decorator';
import { Roles } from 'src/api/role/role.enum';
import { CurrentUser } from 'src/api/auth/guards/user.decorator';
import { User } from 'src/database/entities/user/user.entity';
import { PaymentService } from '../services/payment.service';
import { UserPaymentDto } from '../dto/payment.dto';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('user')
    getUserPayments(
        @CurrentUser() user: User
    ) {
        return this.paymentService.getUserPayments(user);
    }

    @Get(':id')
    getPayment(@Param() params: FindOneParams) {
        return this.paymentService.getPayment(params.id);
    }


    @Auth(Roles.USER, Roles.ADMIN)
    @Post('create')
    addUserPayment(
        @CurrentUser() user: User,
        @Body() body: UserPaymentDto
    ) {
        return this.paymentService.addUserPayment(user, body);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Patch('edit/:id')
    editUserPayment(
        @Param() {id}:any,
        @Body() body: UserPaymentDto
    ) {
        return this.paymentService.editUserPayment(id, body);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('select/:id')
    setPaymentType(
        @CurrentUser() user: User,
        @Param() {id}:any,
    ) {
        return this.paymentService.selectPayment(user, id);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Delete(':id')
    deleteUserPayment(
        @Param() {id}: any
    ) {
        return this.paymentService.deleteUserPayment(id);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Delete('type/:id')
    deletePaymentType(
        @Param() {id}: any
    ) {
        return this.paymentService.deletePaymentType(id);
    }
}