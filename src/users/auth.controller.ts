import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {SignInDto} from "./dto/signinDto";
import {User} from "./interfaces/user";
import {AuthService} from "./auth.service";
import {SignUpDto} from "./dto/signupDto";
import {JwtAuthGuard} from "./common/guards/jwt.guard";

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @UseGuards(JwtAuthGuard)
    // @UsePipes(new JoiValidationPipe(createBookSchema))
    signIn(@Body() signInDto: SignInDto): Promise<User> {
        return this.authService.signIn(signInDto)
    }

    @Post('signup')
    // @UsePipes(new JoiValidationPipe(createBookSchema))
    signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.authService.createUser(signUpDto)
    }
}
