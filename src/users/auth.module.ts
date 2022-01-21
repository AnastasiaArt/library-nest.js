import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtStrategy} from "./common/strategy/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  controllers: [AuthController],
  imports: [PassportModule,JwtModule.register({secret:process.env.jwt_secret_key,   }), ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
