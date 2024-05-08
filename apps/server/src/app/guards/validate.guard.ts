import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { Observable } from 'rxjs';
import 'dotenv/config';

@Injectable()
export class ValidateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const _initData = request.headers[process.env.X_HEADER];

    console.log('init data: ', _initData);

    if (this.validateInitData(_initData)) {
      request['user'] = this.getUserObject(_initData);
      return true;
    } else {
      return false;
    }
  }

  private validateInitData(initData) {
    const data = new URLSearchParams(initData);

    const data_check_string = this.getCheckString(data);
    const secret_key = this.HMAC_SHA256(
      process.env.VALIDATE_KEY,
      process.env.BOT_TOKEN
    ).digest();
    const hash = this.HMAC_SHA256(secret_key, data_check_string).digest('hex');

    return hash === data.get('hash');
  }

  private HMAC_SHA256(key: string | Buffer, secret: string) {
    return createHmac('sha256', key).update(secret);
  }

  private getCheckString(data: URLSearchParams) {
    const items: [k: string, v: string][] = [];

    // remove hash
    for (const [k, v] of data.entries()) if (k !== 'hash') items.push([k, v]);

    return items
      .sort(([a], [b]) => a.localeCompare(b)) // sort keys
      .map(([k, v]) => `${k}=${v}`) // combine key-value pairs
      .join('\n');
  }

  private getUserObject(initData) {
    const data = new URLSearchParams(initData);
    let result = {};
    const items: [k: string, v: string][] = [];

    // remove hash
    for (const [k, v] of data.entries()) if (k !== 'hash') items.push([k, v]);
    items.forEach(([k, v]) => {
      if (k === 'user') {
        result = JSON.parse(v);
      }
    });
    return result;
  }
}
