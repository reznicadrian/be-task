import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => {
        return configService.postgresConfig;
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class ConnectionsModule {}
