import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { MongooseBooksService } from './mongoose/books.service';
import {MongooseModule} from "@nestjs/mongoose";
import {BookSchema, Books} from "./mongoose/schemas/book.schema";
import {FirebaseModule} from "../firebase/firebase.module";
import {FirebaseBooksService} from "./firebase-books/books.service";

@Module({
  imports: [FirebaseModule, MongooseModule.forFeature([{name: Books.name, schema: BookSchema}])],
  controllers: [BooksController],
  providers: [MongooseBooksService,FirebaseBooksService]
})
export class BooksModule {}
