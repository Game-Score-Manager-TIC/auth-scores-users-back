import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    avatar: string;
}

export class TopScoresResponseDto {
    @ApiProperty()
    scoreId: string;

    @ApiProperty()
    game: string;

    @ApiProperty()
    score: number;

    @ApiProperty()
    userId: string;

    @ApiProperty({ type: UserDto })
    user: UserDto;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

