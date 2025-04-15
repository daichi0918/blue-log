import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { LikeService } from './like/like.service';
import { LikeModule } from './like/like.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    PrismaModule,
    ArticlesModule,
    AuthModule,
    LikeModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [LikeService],
})
export class AppModule {}
