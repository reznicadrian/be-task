import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAdminStrategy } from './strategies/admin.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../config/config.module';
import { JwtAuthenticatedStrategy } from './strategies/authenticated.strategy';

@Module({
  imports: [PassportModule, UsersModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtAdminStrategy, JwtAuthenticatedStrategy],
})
export class AuthModule {}
