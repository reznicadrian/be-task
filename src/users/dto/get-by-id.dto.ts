import { ApiProperty } from '@nestjs/swagger';

export class GetByIdDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  id: number;
}
