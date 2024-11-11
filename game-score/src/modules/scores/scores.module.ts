import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema, Score } from './schema/schore.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
  providers: [ScoresService],
  controllers: [ScoresController]
})
export class ScoresModule {}
