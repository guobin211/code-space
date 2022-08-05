import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Cookies装饰器
 */
export const Cookies = createParamDecorator(
  (key = '', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.cookies || {};
    return key ? cookies[key] : cookies;
  },
);
