import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Book } from './book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
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

describe('BooksController', () => {
    let booksController: BooksController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [
                {
                    provide: BooksService,
                    useValue: service
                },
            ],
        }).compile();

        booksController = moduleRef.get<BooksController>(BooksController);
    });

    it('addBook', async () => {
        expect(await booksController.create(book())).toEqual(book());
    });

    it('getAllBooks', async () => {
        expect(await booksController.getAllBooks()).toEqual([
            book(),
            book(),
        ]);
    });

    it('getBookById', async () => {
        expect(await booksController.getBookById('id')).toEqual(book());
    });
});
});