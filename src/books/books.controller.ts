import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors, UsePipes} from '@nestjs/common';
// import {MongooseBooksService} from "./mongoose/books.service";
import {Book} from "./interfaces/book";
import {CreateBookDto} from "./dto/cteateBookDto";
import {TransformResponseInterceptor} from "../common/interceptors/transform-response.interceptor";
import {createBookSchema} from "../common/pipes/joi/createBook.schema";
import {JoiValidationPipe} from "../common/pipes/joi/validate.pipe";
import {Request} from 'express';
import {FirebaseBooksService} from "./firebase-books/books.service";

@Controller('books')
@UseInterceptors(TransformResponseInterceptor)
export class BooksController {
constructor(private booksService: FirebaseBooksService) {}
    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @Post()
    @UsePipes(new JoiValidationPipe(createBookSchema))
    createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.createBook(createBookDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() request: Request): Promise<Book> {
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
