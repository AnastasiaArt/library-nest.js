import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUrl(): void {
    const url = new URL('http://example.com/revenue/v1/advertisers?limit=11&limit=12');
    console.log(url)
    const pathname = url.pathname;
    console.log('pathname: ', pathname);
    const splitArray = url.pathname.split('/v1');
    console.log('splitArray: ', splitArray);
    const serviceName = splitArray[0];
    console.log('serviceName: ', serviceName);
    const serviceUrl = splitArray[1].split('?')[0]
    console.log('serviceUrl: ', serviceUrl);
    const searchParams = new URLSearchParams(url.search)

  }
}

