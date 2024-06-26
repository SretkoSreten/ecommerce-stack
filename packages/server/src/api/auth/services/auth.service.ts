import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/api/user/services/user.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { PayloadDto, VerifyPayloadDto } from "../dto/payload.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { errorMessages } from "src/errors/custom";
import { RoleService } from "src/api/role/services/role.service";
import { Roles } from "src/api/role/role.enum";
import { User } from "src/database/entities/user/user.entity";
import { CartService } from "src/api/cart/services/cart.service";
import { successObject } from "src/common/helper/sucess-response.interceptor";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cartService: CartService
  ) {}

  async login(user: LoginUserDto) {
    const { email, password } = user;
    const alreadyExistingUser = await this.userService.findByEmail(email);

    if (!alreadyExistingUser) {
      throw new UnauthorizedException(errorMessages.auth.emailIncorrect);
    }

    const isValidPassword = await this.userService.comparePassword(
      password,
      alreadyExistingUser.password
    );

    if (!isValidPassword)
      throw new UnauthorizedException(errorMessages.auth.passwordIncorrect);

    const token = await this.generateToken({
      id: alreadyExistingUser.id,
      email
    });

    return token;
  }

  async register(data: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(errorMessages.auth.userAlreadyExist);
    }

    const existingUserName = await this.userService.findByName(data.fullname);
    if (existingUserName) {
      throw new ConflictException(errorMessages.auth.userNameAlreadyExist);
    }

    const customerRole = await this.roleService.findById(Roles.USER);

    const user: User = await this.userService.createUser(data, customerRole);

    await this.cartService.createCart(user);

    return successObject;
  }

  async verifyToken(payload: VerifyPayloadDto) {
    const decoded = await this.jwtService.verify(payload.token, {
      secret: this.configService.get("jwt.secret"),
    });

    if (!decoded) {
      throw new UnauthorizedException(errorMessages.auth.invlidToken);
    }
    
    const user: User = await this.userService.findByEmail(decoded.email);

    if (!user) {
      throw new UnauthorizedException(errorMessages.auth.notFound);
    }

    return decoded;
  }

  async generateToken(payload: PayloadDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get("jwt.secret"),
    });

    return { accessToken };
  }
}
