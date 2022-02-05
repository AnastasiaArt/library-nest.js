import {Injectable} from '@nestjs/common';
import {Book} from "../interfaces/book";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BookDocument, Books} from "./schemas/book.schema";
import {CreateBookDto} from "../dto/cteateBookDto";
import {BooksService} from "../interfaces/booksService";

@Injectable()
export class MongooseBooksService extends BooksService {
    constructor(@InjectModel(Books.name) bookModel: Model<BookDocument>) {
        super(bookModel);
    }

    async getBook(id: string): Promise<Book> {
        return this.bookModel.findById(id).exec();
    }
    async getBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }
    async updateBook(id: string, updateBookDto: CreateBookDto): Promise<Book> {
        return this.bookModel.findByIdAndUpdate(id, updateBookDto, {new: true})
    }
    async deleteBook(id: number | string): Promise<any> {
        return this.bookModel.deleteOne({_id: id}).exec();
    }
    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const book = new this.bookModel(createBookDto);
        return book.save();
    }
}
