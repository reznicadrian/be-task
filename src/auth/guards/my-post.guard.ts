import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { PostsService } from '../../posts/posts.service';
import { Reflector } from '@nestjs/core';
import { UserType } from '../../types/users.types';

@Injectable()
export class MyPostGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly postsService: PostsService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const post = await this.postsService.findOne(request.params.id);

    //@TODO: find a better solution
    if (
      post.userId !== +request.user.id ||
      request.user.type !== UserType.BLOGGER
    ) {
      if (request.user.type === UserType.ADMIN) {
        return true;
      }
      throw new ForbiddenException('You are not the owner of post');
    }
    return true;
  }
}
