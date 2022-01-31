import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { BooksService } from './books.service';
import {BookDocument, Books} from "./schemas/book.schema";

describe('BooksService', () => {
    let booksService: BooksService;
    let bookModel: Model<BookDocument>;
    const book = {
        _id: '123456789',
        title: 'title1',
        description: 'description1',
        authors: 'authors1',
        favourite: true,
        fileCover: 'fileCover1',
        fileName: 'fileName1',
        fileBook: 'fileBook1',
    };
    let model = {
        findById: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        deleteOne: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getModelToken(Books.name),
                    useValue: model,
                },
            ],
        }).compile();

        booksService = moduleRef.get<BooksService>(BooksService);
        bookModel = moduleRef.get<Model<BookDocument>>(getModelToken(Books.name));
    });

    it('createBook', async () => {
        jest.spyOn(bookModel, 'create').mockImplementation((book) => book);
        const result = await booksService.createBook(book);
        expect(result).toEqual(book);
    });

    it('getBooks', async () => {
        const books = [book, book];
        jest.spyOn(bookModel, 'find').mockImplementation(() => books as any);
        const result = await booksService.getBooks();
        expect(result).toEqual(books);
    });

    it('getBook', async () => {
        jest.spyOn(bookModel, 'findById').mockReturnValueOnce(book as any);
        const result = await booksService.getBook(book._id);
        expect(result).toEqual(book);
    });
});