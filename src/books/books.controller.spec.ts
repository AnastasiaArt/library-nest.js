import { INestApplication } from '@nestjs/common';
import { Test} from '@nestjs/testing';
import * as request from 'supertest';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
    let booksController: BooksController;
    let app: INestApplication;
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
        getBooks: jest.fn(),
        getBook: jest.fn(),
        createBook: jest.fn(),
        updateBook: jest.fn(),
        deleteBook: jest.fn(),
    };

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
        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/GET books', () => {
        return request(app.getHttpServer())
            .get('/books')
            .expect(200)
            .expect(service.getBooks());
    });

    it('/GET book by id', () => {
        return request(app.getHttpServer())
            .get(`/books/${book._id}`)
            .expect(200)
            .expect(service.getBook(book._id));
    });

    it('/POST create book', () => {
        return request(app.getHttpServer())
            .post('/books')
            .expect(200)
            .expect(service.createBook(book));
    });

    it('/PUT update book', () => {
        return request(app.getHttpServer())
            .put(`/books/${book._id}`)
            .expect(200)
            .expect(service.updateBook(book._id, book));
    });

    it('/DELETE delete book', () => {
        return request(app.getHttpServer())
            .delete(`/books/${book._id}`)
            .expect(200)
            .expect(service.deleteBook(book._id));
    });

    it('should be defined', () => {
        expect(booksController).toBeDefined();
    });

    afterAll(async () => {
        await app.close();
    });
});