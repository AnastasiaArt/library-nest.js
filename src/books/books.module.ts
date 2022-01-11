import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {MongooseModule} from "@nestjs/mongoose";
import {BookSchema, Books} from "./schemas/book.schema";
console.log(Books)
@Module({
  imports: [MongooseModule.forFeature([{name: Books.name, schema: BookSchema}])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
