import {InjectModel} from "@nestjs/mongoose";
import {BookDocument, Books} from "../mongoose/schemas/book.schema";
import {Model} from "mongoose";
import {Book} from "./book";
import {CreateBookDto} from "../dto/cteateBookDto";

export abstract class BooksService {
    constructor(protected bookModel: any) {
    }
    abstract getBook(id: string): Promise<Book>;

    abstract getBooks(): Promise<Book[]>;

    abstract updateBook(id: string, updateBookDto: CreateBookDto): Promise<Book>;

    abstract deleteBook(id: number | string): Promise<any>;

    abstract createBook(createBookDto: CreateBookDto): Promise<Book>;
}