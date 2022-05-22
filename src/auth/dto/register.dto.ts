import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { LoginDto } from './login.dto';

export class RegisterDto extends PartialType(LoginDto) {
  @ApiProperty({
    default: 'John',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
