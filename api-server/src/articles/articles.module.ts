import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LikeModule } from 'src/like/like.module';
import { BookmarkModule } from 'src/bookmark/bookmark.module';

@Module({
  imports: [PrismaModule, LikeModule, BookmarkModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
