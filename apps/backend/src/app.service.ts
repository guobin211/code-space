import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export type JSONObject = Record<string, any>;

@Injectable()
export class AppService {
  /**
   * 获取请求信息
   * @param request Request
   * @returns
   */
  getRequestInfo(request: Request): JSONObject {
    const cookies = request['cookies'];
    const url = request['url'];
    const headers = request['headers'];
    const userAgent = headers['user-agent'];
    const host = headers['host'];
    const conn = request['socket'] || request['connection'];
    const ip =
      headers['X-Client-IP'] ||
      headers['X-Forwarded-For'] ||
      conn['remoteAddress'];
    return {
      cookies,
      userAgent,
      host,
      ip,
      url,
    };
  }
}
