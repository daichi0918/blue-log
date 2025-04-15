import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(articleId: number, userId: number): Promise<void> {
    const exists = await this.prismaService.like.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });

    if (!exists) {
      await this.prismaService.like.create({
        data: { articleId, userId },
      });
    }
  }

  async remove(articleId: number, userId: number): Promise<void> {
    const exists = await this.prismaService.like.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });

    if (exists) {
      await this.prismaService.like.delete({
        where: { userId_articleId: { userId, articleId } },
      });
    }
  }
}
