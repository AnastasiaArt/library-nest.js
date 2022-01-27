import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import {BookComment} from "../interfaces/bookComment";

export type BookCommentDocument = BookComments & Document;

@Schema()
export class BookComments implements BookComment{
        @Prop()
        id: number;

        @Prop()
        bookId: number;

        @Prop()
        comment: string;

}

export const BookCommentSchema = SchemaFactory.createForClass(BookComments);