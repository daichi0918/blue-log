import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<Article> {
    const { title, text, tags } = createArticleDto;
    return await this.prismaService.article.create({
      data: {
        title,
        text,
        tags,
        userId,
      },
    });
  }

  async findAll(): Promise<Array<any>> {
    const articles = await this.prismaService.article.findMany({
      select: {
        id: true,
        title: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: { id: true, name: true, image: true }, // ユーザー情報
        },
        _count: {
          select: { likes: true }, // いいねの数
        },
      },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      tags: article.tags,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      user: article.user,
      likeCount: article._count.likes,
    }));
  }

  async findById(id: number): Promise<Article> {
    const found = await this.prismaService.article.findUnique({
      where: {
        id,
      },
    });
    if (!found) throw new NotFoundException();
    return found;
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const { title, text, tags } = updateArticleDto;
    return await this.prismaService.article.update({
      where: {
        id,
      },
      data: {
        title,
        text,
        tags,
      },
    });
  }

  async delete(id: number) {
    await this.prismaService.article.delete({
      where: {
        id,
      },
    });
  }
}
