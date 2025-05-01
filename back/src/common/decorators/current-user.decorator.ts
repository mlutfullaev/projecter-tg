import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JWTUser = {
  userId: string;
  telegramId: string;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: { user: JWTUser } = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
