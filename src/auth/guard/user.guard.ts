import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = this.getToken(ctx);
    if (token) {
      try {
        const user = this.authService.verify(token);
        ctx.getContext().req.user = user;
      } catch (e) {}
    }

    return true;
  }

  getToken(context: GqlExecutionContext) {
    return context.getContext().req.headers.authorization?.split(' ')[1];
  }
}
