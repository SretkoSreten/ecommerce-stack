import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Roles } from 'src/api/role/role.enum';
import { Auth } from 'src/api/auth/guards/auth.decorator';
import { User } from 'src/database/entities/user/user.entity';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { CurrentUser } from 'src/api/auth/guards/user.decorator';


@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('user')
    getUserAddresses(user: User) {
        return this.addressService.getUserAddresses(user);
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Get('select/:id')
    selectAddress(@CurrentUser() user: User, @Param() params: FindOneParams) {
        return this.addressService.selectAddress(user, params.id);
    }
}