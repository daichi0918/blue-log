import { Injectable, NotFoundException, Request } from '@nestjs/common';
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

  async findAll(): Promise<Array<Article>> {
    return await this.prismaService.article.findMany();
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
    return await this.prismaService.article.delete({
      where: {
        id,
      },
    });
  }
}
