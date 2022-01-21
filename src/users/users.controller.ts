import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {User} from "./interfaces/user";
import {UsersService} from "./users.service";
import {SignUpDto} from "./dto/signupDto";
import {JwtAuthGuard} from "../auth/common/guards/jwt.guard";
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('signin')
    @UseGuards(JwtAuthGuard)
    signIn(@Request() req): Promise<User> {
        return this.authService.signIn(req.user);
    }

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.usersService.createUser(signUpDto)
    }
}
