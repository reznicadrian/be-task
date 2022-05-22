import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtAuthenticatedStrategy extends PassportStrategy(
  Strategy,
  'jwt-auth',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.jwtConfig.secret,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
