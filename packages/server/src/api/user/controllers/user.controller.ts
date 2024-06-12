import { Body, Controller, Delete, Get, Patch } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CurrentUser } from "src/api/auth/guards/user.decorator";
import { User } from "src/database/entities/user/user.entity";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { Roles } from "src/api/role/role.enum";
import { UpdateUserAuthBody } from "../dto/update-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Roles.ADMIN, Roles.USER)
  @Get("/auth")
  async getUserAuth(@CurrentUser() user: User) {
    return this.userService.getUserAuth(user);
  }

  @Auth(Roles.ADMIN, Roles.USER)
  @Patch("/update")
  async updateUserAuth(
    @CurrentUser() user: User,
    @Body() body: UpdateUserAuthBody
  ) {
    return this.userService.updateUserAuth(user, body);
  }

  @Auth(Roles.ADMIN, Roles.USER)
  @Delete("/delete")
  async deletUserAuth(@CurrentUser() user: User) {
    return this.userService.deleteAccount(user);
  }
}
