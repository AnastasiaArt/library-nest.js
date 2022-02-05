import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {Users, UserSchema} from "./schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [forwardRef(() => AuthModule), MongooseModule.forFeature([{name: Users.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
