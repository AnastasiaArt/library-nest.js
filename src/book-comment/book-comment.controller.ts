import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateBookCommentDto} from "./dto/cteateBookCommentDto";
import {BookComment} from "./interfaces/bookComment";
import {BookCommentService} from "./book-comment.service";

@Controller('book-comment')
export class BookCommentController {
    constructor(private bookCommentService: BookCommentService) {}

    @Post()
    addBookComment(@Body() createBookCommentDto: CreateBookCommentDto): Promise<BookComment> {
        return this.bookCommentService.addBookComment(createBookCommentDto)
    }

    @Get(':id')
    findAll(@Param('id') id: number): Promise<BookComment[]> {
        return this.bookCommentService.findAllBookComment(id);
    }
}
