import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'Vasile',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    default: 'asdfgh@mail.com',
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
  @MinLength(6)
  @MaxLength(20)
  readonly password: string;
}
