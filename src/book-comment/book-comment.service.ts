import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateBookCommentDto} from "./dto/cteateBookCommentDto";
import {BookCommentDocument, BookComments} from "./schemas/book-comment.schema";
import {BookComment} from "./interfaces/bookComment";

@Injectable()
export class BookCommentService {
    constructor(@InjectModel(BookComments.name) private bookCommentModel: Model<BookCommentDocument>) {}

    async findAllBookComment(bookId: number): Promise<BookComment[]> {
        return this.bookCommentModel.find({bookId: bookId}).exec();
    }

    async addBookComment(createBookCommentDto: CreateBookCommentDto): Promise<BookComment> {
        const comment = new this.bookCommentModel(createBookCommentDto);
        return comment.save();
    }
}
