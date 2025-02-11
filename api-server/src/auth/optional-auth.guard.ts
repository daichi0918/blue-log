import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Authorization ヘッダーがない場合はそのままリクエストを通す（認証なしでアクセス）
    if (!authHeader) {
      return true;
    }

    try {
      // `AuthGuard('jwt')` のロジックを手動で呼び出し、認証に失敗した場合はエラーをスローしない
      await super.canActivate(context); // JWT が有効なら通常通り認証処理
      return true;
    } catch (error) {
      // JWT トークンが無効な場合でもエラーを返さず、リクエストを通す
      return true;
    }
  }
}
