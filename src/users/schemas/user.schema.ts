import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import {User} from "../interfaces/user";
export type UserDocument = User & Document;

@Schema()
export class Users implements User{
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    id: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);