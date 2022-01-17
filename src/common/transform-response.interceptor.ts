import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';

enum STATUS {
  SUCCESS = 'success',
  ERROR = 'fail',
}
export interface Response<T> {
  data: T;
  status: STATUS;
}
@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
        map(data => ({ status: STATUS.SUCCESS, data })),
        catchError((err) => throwError(of({
              status: STATUS.ERROR,
              data: err
          }))),
    );
  }
}
