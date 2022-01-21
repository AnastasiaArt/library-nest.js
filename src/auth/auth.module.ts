import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule,JwtModule.register({secret:process.env.jwt_secret_key,   }), ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}