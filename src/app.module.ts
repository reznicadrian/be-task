import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConnectionsModule } from './connections/connections.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, ConnectionsModule, UsersModule],
})
export class AppModule {}
