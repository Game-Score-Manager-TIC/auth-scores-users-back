import { Controller, UseGuards, Query, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Score } from './schema/schore.schema';
import { CreateScoresDto } from './dto/create-score.dto';
import { UpdateScoresDto } from './dto/update-score.dto';
import { PaginationQueryDto } from '../commons/paginationQueryDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Scores')
@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'PLAYER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Trae todos los scores' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Todos los scores', type: [Score] })
    async getAllScores(@Query() paginationQuery: PaginationQueryDto) {
      return await this.scoresService.getAllScores(paginationQuery);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'PLAYER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear score'})
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Score creado', type: Score })
    async createScore(@Body() createScoreDto: CreateScoresDto) {
        return await this.scoresService.createScore(createScoreDto);
    }

    @Get('top-ten')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'PLAYER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener los 10 scores más altos' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Top 10 scores', type: [Score] })
    async getTopTenScores() {
        return await this.scoresService.getTopTenScores();
    }

    @Get(':scoreId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'PLAYER')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener score por ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Score encontrado', type: Score })
    async getScoreById(@Param('scoreId') scoreId: string): Promise<Score> {
        return await this.scoresService.getScoreById(scoreId);
    }
    
    @Delete(':scoreId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Borrar score por ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Score borrado' })
    async deleteScore(@Param('scoreId') scoreId: string) {
        await this.scoresService.deleteScore(scoreId);
    }

    @Put(':scoreId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar score por ID' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Score no encontado!'})
    @ApiResponse({ status: HttpStatus.OK, description: 'Score actualizado', type: Score })
    async updateScore(@Param('scoreId') scoreId: string, @Body() updateScoreDto: UpdateScoresDto) {
        return await this.scoresService.updateScore(scoreId, updateScoreDto);
    }



}
