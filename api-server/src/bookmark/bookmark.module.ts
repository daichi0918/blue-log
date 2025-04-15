import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BookmarkService, PrismaService],
  exports: [BookmarkService],
})
export class BookmarkModule {}
