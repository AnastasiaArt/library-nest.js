import {Prop, SchemaFactory, Schema} from "@nestjs/mongoose";
import {Book} from "../interfaces/book";

export type BookDocument = Books & Document;

@Schema()
export class Books implements Book{
        @Prop()
        id: string;

        @Prop()
        title: string;

        @Prop()
        description: string;

        @Prop()
        authors: string;

        @Prop()
        favorite: string;

        @Prop()
        fileCover: string;

        @Prop()
        fileName: string;

        @Prop()
        fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Books);