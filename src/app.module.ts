import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { ConnectionsModule } from './connections/connections.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule, ConnectionsModule, AuthModule, UsersModule, PostsModule],
})
export class AppModule {}
