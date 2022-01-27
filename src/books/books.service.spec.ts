import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { createMock } from '@golevelup/nestjs-testing';

import { BooksService } from './books.service';
import { Book, BookDocument } from './books.schema';

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
const service = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('BooksService', () => {
    let booksService: BooksService;
    let bookModel: Model<BookDocument>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getModelToken(Book.name),
                    useValue: {
                        find: jest.fn(),
                        findById: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        booksService = moduleRef.get<BooksService>(BooksService);
        bookModel = moduleRef.get<Model<BookDocument>>(getModelToken(Book.name));
    });

    it('addBook', async () => {
        jest.spyOn(bookModel, 'create').mockImplementationOnce(() => mockBook());
        const result = await booksService.addBook(mockBook());

        expect(result).toEqual(mockBook());
    });

    it('getAllBooks', async () => {
        const booksArray = [mockBook(), mockBook()];

        jest.spyOn(bookModel, 'find').mockResolvedValueOnce(booksArray as any);
        const result = await booksService.getAllBooks();
        expect(result).toEqual(booksArray);
    });

    it('getBookById', async () => {
        jest.spyOn(bookModel, 'findById').mockReturnValueOnce(
            createMock<Query<BookDocument, BookDocument>>({
                exec: jest.fn().mockResolvedValueOnce(mockBook()),
            }),
        );

        const result = await booksService.getBookById('id');

        expect(result).toEqual(mockBook());
    });
});