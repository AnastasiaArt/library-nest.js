import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors, UsePipes} from '@nestjs/common';
import {BooksService} from "./books.service";
import {Book} from "./interfaces/book";
import {CreateBookDto} from "./dto/cteateBookDto";
import {TransformResponseInterceptor} from "../common/interceptors/transform-response.interceptor";
import {createBookSchema} from "../common/pipes/joi/createBook.schema";
import {JoiValidationPipe} from "../common/pipes/joi/validate.pipe";
import { Request } from 'express';

@Controller('books')
@UseInterceptors(TransformResponseInterceptor)
export class BooksController {
constructor(private booksService: BooksService) {}
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
    findOne(@Param('id') id: string, @Req() request: Request, @Query() query: QueryDto): Promise<Book> {
        console.log(request)
        console.log(query)
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
