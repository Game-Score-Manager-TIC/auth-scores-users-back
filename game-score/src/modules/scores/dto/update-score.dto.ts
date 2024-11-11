import { ApiProperty } from '@nestjs/swagger'

export class UpdateScoresDto {
    @ApiProperty({ description: 'Update scores', example: ""})
    score: number;
}