import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Me } from '../common/decorators/me.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<string> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Register',
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<string> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: "Get the current user's information",
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Get('me')
  me(@Me() me) {
    return me;
  }
}
