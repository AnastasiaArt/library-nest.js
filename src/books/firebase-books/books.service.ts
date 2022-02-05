import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BooksService} from "../interfaces/booksService";
import {Book} from "../interfaces/book";
import {CreateBookDto} from "../dto/cteateBookDto";
import {FirebaseService} from "../../firebase/firebase.service";

@Injectable()
export class FirebaseBooksService extends BooksService {
    constructor(private readonly firebaseService: FirebaseService) {
        super(firebaseService);
    }

    async getBook(id: string): Promise<Book> {
        const res = await this.firebaseService.db.ref('books').child(id).get();
        if (!res.val()) {
            throw new HttpException('book not found', HttpStatus.NOT_FOUND);
        }
        return res.val();
    }

    async getBooks(): Promise<Book[]> {
        const res = await this.firebaseService.db.ref('books').get();
        return await res.val();
    }

    async updateBook(id: string, updateBookDto: CreateBookDto): Promise<Book> {
        const res = await this.firebaseService.db.ref('books').child(id).update({...updateBookDto});
        if (!res.id) {
            throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
        }
        const data = await res.get();
        return {
            id: res.key,
            ...data.data(),
        }
    }

    async deleteBook(id: number | string): Promise<any> {
        return await this.firebaseService.db.ref('books').child(id).remove();
    }

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const res = await this.firebaseService.db.ref('books').push(createBookDto);
        if (!res.id) {
            throw new HttpException('book not created', HttpStatus.BAD_REQUEST);
        }
        const data = await res.get();
        return {
            id: res.key,
            ...data.data(),
        }
    }
}
