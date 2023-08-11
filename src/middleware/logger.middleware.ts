import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/utils/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) { }

  // use(req: Request, res: Response, next: NextFunction) {
  //   // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
  //   const { ip, method, originalUrl } = req;
  //   const userAgent = req.get('user-agent');

  //   // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
  //   res.on('finish', () => {
  //     const { statusCode } = res;
  //     this.logger.log(
  //       `method-${method} url-${originalUrl} statusCode-${statusCode} ip-${ip} userAgent-${userAgent}`,
  //       'LoggerMiddleware'
  //     );
  //   });

  //   next();
  // }

  use(req: Request, res: Response, next: NextFunction) {
    const loggerService = new LoggerService(
      req.url.slice(1).split('/')[req.url.slice(1).split('/').length - 1],
    );
    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _headers = req.headers ? req.headers : {};
    const _query = req.query ? req.query : {};
    const _body = req.body ? req.body : {};
    const _url = tempUrl ? tempUrl : {};

    loggerService.info(
      JSON.stringify({
        url: _url,
        headers: _headers,
        query: _query,
        body: _body,
      }),
    );

    next();
  }
}