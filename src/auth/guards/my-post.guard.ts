import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { PostsService } from '../../posts/posts.service';

@Injectable()
export class MyPostGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const post = await this.postsService.findOne(request.params.id);

    if (post.userId !== request.user.id) {
      throw new ForbiddenException('You are not the owner of post');
    }
    return true;
  }
}
