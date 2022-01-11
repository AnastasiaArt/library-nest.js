import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {BooksService} from "./books.service";
import {Book} from "./interfaces/book";
import {CreateBookDto} from "./dto/cteateBookDto";

@Controller('books')
export class BooksController {
constructor(private booksService: BooksService) {}
    // получение всех книг
    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(createBookDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.getBook(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: CreateBookDto): Promise<Book> {
        return this.booksService.updateBook(id, updateCatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Book> {
        return this.booksService.deleteBook(id);
    }
}
