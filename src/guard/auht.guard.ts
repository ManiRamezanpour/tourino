import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as _AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class AuthGuard extends _AuthGuard('jwt') {
  constructor(private canNext: boolean) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || (!user && !this.canNext)) {
      throw err || new UnauthorizedException();
    }
    return user || null;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(type);

    return type === 'Bearer' ? token : undefined;
  }
}

export function authGuard(canNext: boolean) {
  return new AuthGuard(canNext);
}
