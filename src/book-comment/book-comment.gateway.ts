import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import {Server} from 'ws';
import {BookCommentService} from "./book-comment.service";
import {catchError, from, map, Observable, throwError} from "rxjs";

@WebSocketGateway(80, {namespace: 'events'})
export class BookCommentGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly bookCommentService: BookCommentService) {
    }

    @SubscribeMessage('addComment')
    addComment(@MessageBody() data): Observable<unknown> {
        return from(this.bookCommentService.addBookComment(data)).pipe(
            map((res) => {
                return {event: 'addComment', res}
            }),
            catchError(error => {
                return throw new WsException('Invalid credentials.')})
        );
    }

    @SubscribeMessage('findAllComments')
    getAllComments(@MessageBody('bookId') bookId: number): Observable<unknown> {
        return from(this.bookCommentService.findAllBookComment(bookId)).pipe(
            map((res) => {
                return {event: 'findAllComments', data: res};
            }),
            catchError(error => {
                return throw new WsException('Invalid credentials.')
            })
        );
    }
}
