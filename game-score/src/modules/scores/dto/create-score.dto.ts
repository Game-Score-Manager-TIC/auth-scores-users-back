import { ApiProperty } from '@nestjs/swagger';
import { Score } from '../schema/schore.schema';


export class CreateScoresDto {
    @ApiProperty({ description: 'UserId (UUID)'})
    userId: string;

    @ApiProperty({ description: 'Nombre del juego' })
    game: string;

    @ApiProperty({ description: 'Puntaje para el juego' })
    score: Score;
}