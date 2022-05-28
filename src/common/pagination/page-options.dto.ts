import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderByTypes } from '../../types/order-by.types';

export class PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderByTypes)
  readonly order: OrderByTypes.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  @IsInt()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @IsOptional()
  @IsInt()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
