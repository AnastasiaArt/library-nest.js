import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { BookCommentModule } from './book-comment/book-comment.module';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      BooksModule,
      UsersModule,
      AuthModule,
      // BookCommentModule,
      MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
              uri: configService.get<string>('MONGO_CONNECTION_URL'),
          }),
          inject: [ConfigService],
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
