import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/types/requestUser';
import { AuthGuard } from '@nestjs/passport';
import { LikeService } from 'src/like/like.service';
import { BookmarkService } from 'src/bookmark/bookmark.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly likeService: LikeService,
    private readonly bookmarkService: BookmarkService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Article> {
    return await this.articlesService.create(createArticleDto, req.user.userId);
  }

  @Get()
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param('id') id: string): Promise<Article> {
    return await this.articlesService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    await this.articlesService.delete(+id);
  }

  @Post(':articleId/like')
  @UseGuards(AuthGuard('jwt'))
  likeArticle(
    @Param('articleId') articleId: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    return this.likeService.create(+articleId, +req.user.userId);
  }

  @Delete(':articleId/like')
  @UseGuards(AuthGuard('jwt'))
  unlikeArticle(
    @Param('articleId') articleId: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    return this.likeService.remove(+articleId, +req.user.userId);
  }

  @Post(':articleId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  bookmarkArticle(
    @Param('articleId') articleId: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    return this.bookmarkService.create(+articleId, +req.user.userId);
  }

  @Delete(':articleId/bookmark')
  @UseGuards(AuthGuard('jwt'))
  unbookmarkArticle(
    @Param('articleId') articleId: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    return this.likeService.remove(+articleId, +req.user.userId);
  }
}
