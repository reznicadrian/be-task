import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from '../../users/entities/user.entity';

export class CreatePostDto {
  @ApiProperty({
    default: 'Java Script',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  readonly title: string;

  @ApiProperty({
    default:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  @MaxLength(1000)
  readonly content: string;

  @ApiProperty({
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  readonly isHidden: boolean;
}
