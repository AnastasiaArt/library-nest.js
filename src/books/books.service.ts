import {Injectable} from '@nestjs/common';
import {Book, CreateBookDto} from "./interfaces/book";

@Injectable()
export class BooksService {
    private readonly books: Book[] = [];

    findAll(): Book[] {
        return this.books;
    }

    createBook(book: CreateBookDto): Book {
        this.books.push(book as Book)
        return book as Book;
    }
}
