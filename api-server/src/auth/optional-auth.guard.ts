import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Authorization ヘッダーがない場合はそのままリクエストを通す（認証なしでアクセス）
    if (!authHeader) {
      return true;
    }
    return super.canActivate(context);
  }
}
