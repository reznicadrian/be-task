import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto extends PartialType(LoginDto) {
  @ApiProperty({
    default: 'John',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
