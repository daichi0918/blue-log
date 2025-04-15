import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LikeService, PrismaService],
  exports: [LikeService],
})
export class LikeModule {}
