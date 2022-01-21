import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./interfaces/user";
import {UserDocument} from "./schemas/user.schema";
import {SignUpDto} from "./dto/signupDto";
import {SignInDto} from "./dto/signinDto";
import {createHash} from "crypto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private readonly jwtService: JwtService,) {}
    async createUser(signUpDto: SignUpDto): Promise<User> {
        const user = new this.userModel(signUpDto);
        return user.save();
    }
    async validateUser(signInDto: SignInDto): Promise<any> {
        const user = await this.userModel.findOne({email: signInDto.email});
        if (user && createHash(user.password) === createHash(signInDto.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
    async signIn(signInDto: SignInDto): Promise<any> {
        this.jwtService.sign(signInDto);
    }
}
