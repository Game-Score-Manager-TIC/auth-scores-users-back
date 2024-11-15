import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => String)
  limit?: string;

  @IsOptional()
  @Type(() => String)
  page?: string;

  @IsOptional()
  @Type(() => String)
  query?: string;
}
