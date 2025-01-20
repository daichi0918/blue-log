import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { title, text, tags } = createArticleDto;
    return await this.prismaService.article.create({
      data: {
        title,
        text,
        tags,
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

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
