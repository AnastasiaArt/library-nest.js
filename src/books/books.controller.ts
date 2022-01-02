import {Body, Controller, Get, Post} from '@nestjs/common';
import {BooksService} from "./books.service";
import {Book, CreateBookDto} from "./interfaces/book";

@Controller('books')
export class BooksController {
constructor(private booksService: BooksService) {}
    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Post()
    async createBook(@Body() createBookDTO: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(createBookDTO)
    }
}
