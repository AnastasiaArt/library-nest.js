import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./interfaces/user";
import {UserDocument, Users} from "./schemas/user.schema";
import {SignUpDto} from "./dto/signupDto";
import {SignInDto} from "./dto/signinDto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel: Model<UserDocument>) {}
    async createUser(signUpDto: SignUpDto): Promise<User> {
        const user = new this.userModel(signUpDto);
        return user.save();
    }
    async findUser (signInDto: SignInDto): Promise<User | null> {
        const user = await this.userModel.findOne({email: signInDto.email});
        return user || null
    }
}
