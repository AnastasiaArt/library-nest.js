import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookCommentModule } from './book-comment/book-comment.module';
import { BookCommentGateway } from './book-comment/book-comment.gateway';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      BooksModule,
      MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
              uri: configService.get<string>('MONGO_CONNECTION_URL'),
          }),
          inject: [ConfigService],
      }),
      UsersModule,
      AuthModule,
      BookCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookCommentGateway],
})
export class AppModule {}
