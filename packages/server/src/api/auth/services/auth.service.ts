import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/user/services/user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { PayloadDto, VerifyPayloadDto } from '../dto/payload.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { errorMessages } from 'src/errors/custom';
import { RoleService } from 'src/api/role/services/role.service';
import { Roles } from 'src/api/role/role.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(user: LoginUserDto) {
        const { email, password } = user;
        const alreadyExistingUser = await this.userService.findByEmail(email);

        if (!alreadyExistingUser) {
            throw new UnauthorizedException(errorMessages.auth.emailIncorrect);
        }

        const isValidPassword = await this.userService.comparePassword(
            password,
            alreadyExistingUser.password,
        );

        if (!isValidPassword)
            throw new UnauthorizedException(errorMessages.auth.passwordIncorrect);

        const token = await this.generateToken({
            id: alreadyExistingUser.id,
            email,
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

        await this.userService.createUser(data, customerRole);

        return { message: 'success' };
    }

    async verifyToken(payload: VerifyPayloadDto){
        const decoded = await this.jwtService.verify(payload.token, {
            secret: this.configService.get('jwt.secret'),
        });

        if (!decoded){
            throw new UnauthorizedException(errorMessages.auth.invlidToken);
        }

        return decoded;
    }

    async generateToken(payload: PayloadDto) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('jwt.secret'),
        });

        return { accessToken };
    }
}