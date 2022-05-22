import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

import { ConfigService } from '../config/config.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) throw new HttpException('User does not exist', 404);

    const isValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isValid) throw new UnprocessableEntityException('Invalid password');

    const payload = instanceToPlain(user);

    return this.jwtService.sign({ ...payload }, this.configService.jwtConfig);
  }

  async register(registerDto: RegisterDto): Promise<string> {
    const user = await this.userService.register(registerDto);

    const payload = instanceToPlain(user);

    return this.jwtService.sign({ ...payload }, this.configService.jwtConfig);
  }
}
