import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './schema/schore.schema';
import { CreateScoresDto } from './dto/create-score.dto';
import { UpdateScoresDto } from './dto/update-score.dto';
import { PaginationQueryDto } from '../commons/paginationQueryDto';

@Injectable()
export class ScoresService {

    constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) { }

    async getAllScores(paginationQuery: PaginationQueryDto) {
        const { limit = 10, page = 1 } = paginationQuery;
        const limitNumber = Number(limit)
        const pageNumber = Number(page)
        const skip = (pageNumber - 1) * limitNumber;

        // Obtener los resultados paginados
        const scores = await this.scoreModel
            .find({ status: true })
            .select({ scoreId: 1, _id: 0, game: 1, score: 1, userId: 1 })
            .skip(skip)
            .limit(limitNumber)
            .exec();

        // Contar el total de documentos
        const total = await this.scoreModel.countDocuments({ status: true });
        const totalPages = Math.ceil(total / limitNumber);

        return {
            data: scores,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async createScore(createScoreDto: CreateScoresDto) {
        const newScore = new this.scoreModel(createScoreDto);
        const score = await newScore.save();
        return this.getScoreById(score.scoreId);
    }

    async getScoreById(scoreId: string): Promise<Score> {
        const foundScore = await this.scoreModel
            .findOne({
                scoreId: scoreId,
                status: true
            })
            .select({ scoreId: 1, _id: 0, game: 1, score: 1, userId: 1 })
            .exec();

        if (!foundScore) {
            throw new NotFoundException(`Score with id ${scoreId} not found`);
        }

        return foundScore;
    }

    async updateScore(scoreId: string, updateScoreDto: UpdateScoresDto) {
        const updatedScore = await this.scoreModel
            .findOneAndUpdate(
                { scoreId: scoreId, status: true },
                updateScoreDto,
                { new: true }
            )
            .exec();

        if (!updatedScore) {
            throw new NotFoundException(`Score with id ${scoreId} not found`);
        }

        return this.getScoreById(updatedScore.scoreId);
    }

    async deleteScore(scoreId: string): Promise<void> {
        const deleteScore = await this.scoreModel.findOneAndUpdate({
            scoreId: scoreId,
            status: true
        },
            { status: false })
            .exec();

        if (!deleteScore) {
            throw new NotFoundException(`Score with id ${scoreId} not found`);
        }
    }

    async getTopTenScores() {
        const topScores = await this.scoreModel
            .find({ status: true })
            .sort({ score: -1 }) // Orden descendente
            .limit(10)            // Limitar a los primeros 10
            .select({ scoreId: 1, _id: 0, game: 1, score: 1, userId: 1 })
            .exec();
        return topScores;
    }
}
