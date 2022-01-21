import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "../../auth.service";
import {SignInDto} from "../../dto/signinDto";
import {PassportStrategy} from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.jwt_secret_key,
            }
        );
    }
    async validate(signInDto: SignInDto): Promise<any> {
        const user = await this.authService.validateUser(signInDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}