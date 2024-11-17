import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './schema/schore.schema';
import { CreateScoresDto } from './dto/create-score.dto';
import { UpdateScoresDto } from './dto/update-score.dto';
import { PaginationQueryDto } from '../commons/paginationQueryDto';
import { faker } from '@faker-js/faker';
import { UsersService } from '../users/users.service';
import { TopScoresResponseDto } from './schema/top-scores-response.dto';



@Injectable()
export class ScoresService {

    constructor(@InjectModel(Score.name) private scoreModel: Model<Score>, private userService: UsersService) {
        // this.generateMockData();
    }


    // private async generateMockData(): Promise<void> {

    //     for (let i = 0; i < 500; i++) {
    //         const scoreData = {
    //             game: faker.word.sample(), // Adjusted to match the type for game
    //             score: faker.number.float({ min: 0, max: 1000 }), // Score between 0 and 1000
    //             status: faker.datatype.boolean(), // Random true/false
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             created_at: new Date(),
    //             updated_at: new Date(),
    //         }

    //         const newScore = new this.scoreModel(scoreData);
    //         await newScore.save();
    //     }
    // }

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

    async getScoresByUserId(userId: string): Promise<Score[]> {
        const foundScores = await this.scoreModel.find({
            userId: userId,
            status: true
        })
            .select({ scoreId: 1, _id: 0, game: 1, score: 1, userId: 1 })
            .exec();

        if (!foundScores) {
            throw new NotFoundException(`No scores found for user with id ${userId}`);
        }

        return foundScores;
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

    async getTopFiveScores(): Promise<TopScoresResponseDto[]> {
        const topScores = await this.scoreModel
            .find({ status: true })
            .sort({ score: -1 })
            .limit(5)
            .select({ scoreId: 1, _id: 0, game: 1, score: 1, userId: 1 })
            .exec();

        // Obtener los IDs de los usuarios para buscar sus datos en la base de datos
        const userIds = topScores.map(score => score.userId);
        // Obtener los datos de los usuarios para enriquecer los puntajes
        const users = await this.userService.getUsersByIds(userIds);

        // Crear un mapa de usuarios para obtener los datos en un tiempo constante
        const userMap = new Map(users.map(user => [user.userId, user]));

        // Enriquecer los puntajes con los datos del usuario
        const enrichedScores = topScores.map(score => {
            const user = userMap.get(score.userId);
            return {
                scoreId: score.scoreId,
                game: score.game,
                score: score.score,
                userId: score.userId,
                user: {
                    name: user?.name ?? 'Unknown',
                    email: user?.email ?? 'Unknown',
                    avatar: user?.avatar ?? 'Unknown',
                },
                createdAt: score.createdAt,
                updatedAt: score.updatedAt,
            };
        });

        return enrichedScores;
    }
}
