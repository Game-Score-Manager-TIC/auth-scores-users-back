import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'prisma/prisma.services';
import { UsersService } from './users.service'

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController]
})
export class UsersModule {}
