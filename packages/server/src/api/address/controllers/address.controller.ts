import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { AddressService } from "../services/address.service";
import { Roles } from "src/api/role/role.enum";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { User } from "src/database/entities/user/user.entity";
import { FindOneParams } from "src/common/helper/findOneParams.dto";
import { CurrentUser } from "src/api/auth/guards/user.decorator";
import { CreateAddressDto } from "../dto/create-address.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Auth(Roles.USER, Roles.ADMIN)
  @Get("user")
  getUserAddresses(@CurrentUser() user: User) {
    return this.addressService.getUserAddresses(user);
  }

  @Auth(Roles.USER, Roles.ADMIN) 
  @Post("create")
  createAddress(
    @CurrentUser() user: User,
    @Body() body: CreateAddressDto
  ) {
    return this.addressService.createAddress(user, body);
  }

  @Auth(Roles.USER, Roles.ADMIN) 
  @Patch(":id")
  updateAddress(
    @Param() params: FindOneParams,
    @Body() body: CreateAddressDto
  ) {
    return this.addressService.updateAddress(params.id, body);
  }


  @Auth(Roles.USER, Roles.ADMIN)
  @Get(":id")
  getAddress(@Param() params: FindOneParams) {
    console.log(params)
    return this.addressService.getAddressById(params.id);
  }

  @Auth(Roles.USER, Roles.ADMIN)
  @Get("select/:id")
  selectAddress(@CurrentUser() user: User, @Param() params: FindOneParams) {
    return this.addressService.selectAddress(user, params.id);
  }

  @Auth(Roles.USER, Roles.ADMIN)
  @Delete(":id")
  deleteAddress(@Param() params: FindOneParams) {
    return this.addressService.deleteAddress(params.id);
  }
}
