import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'grisa@mail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    default: '0000000',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
