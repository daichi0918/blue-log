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
      orderBy: {
        createdAt: 'desc',
      },
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

  async findById(id: number, userId: number | null): Promise<any> {
    const found = await this.prismaService.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        text: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            twitter: true,
            facebook: true,
            github: true,
            profile: true,
            followers: {
              select: {
                follower: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            following: {
              select: {
                following: {
                  // Follow モデルの `following` を参照
                  select: {
                    id: true,
                  },
                },
              },
            },

            _count: {
              select: {
                followers: true, // フォロワー数
                following: true, // フォロー数
              },
            },
          },
        },
        _count: {
          select: { likes: true }, // いいねの数
        },
        likes: userId
          ? {
              where: { userId }, // ログインユーザーがいいねしているかどうか
              select: { userId: true },
            }
          : false,
      },
    });

    if (!found) throw new NotFoundException();

    return {
      id: found.id,
      title: found.title,
      text: found.text,
      tags: found.tags,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
      user: {
        ...found.user,
        followerCount: found.user._count.followers, // フォロワー数
        followingCount: found.user._count.following, // フォロー数
      },
      likeCount: found._count.likes,
      isLiked: userId ? found.likes.length > 0 : false,
      isAuthor: userId ? found.user.id === userId : false,
    };
  }

  async findByUserId(userId: number) {
    const articles = await this.prismaService.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
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

  async findLikedArticlesByUserId(userId: number) {
    const likedArticles = await this.prismaService.article.findMany({
      where: {
        likes: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: { id: true, name: true, image: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    return likedArticles.map((article) => ({
      id: article.id,
      title: article.title,
      tags: article.tags,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      user: article.user,
      likeCount: article._count.likes,
    }));
  }

  async findBookmarkedArticlesByUserId(userId: number) {
    const likedArticles = await this.prismaService.article.findMany({
      where: {
        bookmarks: {
          some: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: { id: true, name: true, image: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    return likedArticles.map((article) => ({
      id: article.id,
      title: article.title,
      tags: article.tags,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      user: article.user,
      likeCount: article._count.likes,
    }));
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
