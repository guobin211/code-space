import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const cookies = request['cookies'];
    if (Object.values(cookies).length) {
      console.log(`Cookies: ${JSON.stringify(cookies)}`);
    } else {
      console.log('Cookies: Empty');
    }
    next();
  }
}

/**
 * 全局函数式中间件
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export function cookieLogger(req: Request, res: Response, next: NextFunction) {
  next();
}
