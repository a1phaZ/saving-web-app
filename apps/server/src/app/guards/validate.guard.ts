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

    return this.validateInitData(_initData);
  }

  private validateInitData(initData) {
    const data = new URLSearchParams(initData);

    const data_check_string = this.getCheckString(data);
    const secret_key = this.HMAC_SHA256(
      process.env.VALIDATE_KEY,
      process.env.BOT_TOKEN
    ).digest();
    const hash = this.HMAC_SHA256(secret_key, data_check_string).digest('hex');

    if (hash === data.get('hash')) {
      // validated!
      return true;
    }

    return false;
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
}
