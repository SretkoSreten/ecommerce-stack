import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../services/auth.service';
import { VerifyPayloadDto } from '../dto/payload.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }

    @Post('verify-token')
    verifyToken(@Body() payload: VerifyPayloadDto) {
        return this.authService.verifyToken(payload);
    }
}