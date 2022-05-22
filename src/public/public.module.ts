import { Module } from '@nestjs/common';

import { PublicController } from './public.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [PublicController],
})
export class PublicModule {}
