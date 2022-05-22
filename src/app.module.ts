import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConnectionsModule } from './connections/connections.module';

@Module({
  imports: [ConfigModule, ConnectionsModule],
})
export class AppModule {}
