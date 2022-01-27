import { Module } from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentController } from './book-comment.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {BookComments, BookCommentSchema} from "./schemas/book-comment.schema";
import {BookCommentGateway} from "./book-comment.gateway";

@Module({
  imports: [MongooseModule.forFeature([{name: BookComments.name, schema: BookCommentSchema}])],
  providers: [BookCommentService, BookCommentGateway],
  controllers: [BookCommentController]
})
export class BookCommentModule {}
