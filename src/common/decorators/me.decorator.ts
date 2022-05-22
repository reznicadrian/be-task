import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Me = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    if (!user) {
      return null;
    }

    return user;
  },
);
