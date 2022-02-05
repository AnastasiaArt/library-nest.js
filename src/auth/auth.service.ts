import { Injectable } from '@nestjs/common';
import {User} from "../users/interfaces/user";
import {SignInDto} from "../users/dto/signinDto";
import {createHash} from "crypto";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private readonly jwtService: JwtService,) {}
    async validateUser(signInDto: SignInDto): Promise<any> {
        const user = await this.userService.findUser(signInDto);
        if (user && createHash(user.password) === createHash(signInDto.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    async signIn(user: User): Promise<any> {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}