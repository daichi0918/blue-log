import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(articleId: number, userId: number): Promise<void> {
    await this.prismaService.bookmark.create({
      data: {
        articleId,
        userId,
      },
    });
  }

  async remove(articleId: number, userId: number): Promise<void> {
    await this.prismaService.bookmark.delete({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });
  }
}
