import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserType } from 'src/interfaces/User';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/types/jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { getRandomColor } from '../utils/getRandomColor';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 特定ユーザー取得
   * @param {string} id
   * @returns {User}
   */
  async fetchUserProfile(
    id: number,
  ): Promise<User & { followerCount: number; followingCount: number }> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const followerCount = await this.prismaService.follow.count({
      where: { followingId: id },
    });

    const followingCount = await this.prismaService.follow.count({
      where: { followerId: id },
    });

    return {
      ...user,
      followerCount,
      followingCount,
    };
  }

  /**
   * 特定ユーザー更新機能
   * @param {string} id
   * @returns {User}
   */
  async updateUserProfile(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // ユーザーが存在するか確認
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // ユーザー情報を更新
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto, // 渡されたデータのみを更新
      },
    });

    return updatedUser;
  }

  /**
   * 新規ユーザー作成
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserDto;

    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new UnauthorizedException(
        `${email} は別のアカウントで使用されています。`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomColor = getRandomColor(); // ランダムな背景色を生成

    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        backgroundColor: randomColor, // 背景色を保存
      },
    });

    const resUser: ResponseUserType = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      image: createdUser.image,
      profile: createdUser.profile,
      twitter: createdUser.twitter,
      github: createdUser.github,
      facebook: createdUser.facebook,
      backgroundColor: createdUser.backgroundColor, // 背景色を含める
      createdAt: createdUser.createdAt,
      updateAt: createdUser.updateAt,
    };

    const payload: JwtPayload = {
      sub: createdUser.id,
      username: createdUser.name,
    };

    return {
      user: resUser,
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * ログイン機能
   * @param credentialsDto
   */
  async signIn(credentialsDto: CredentialsDto): Promise<any> {
    const { email, password } = credentialsDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const resUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const payload: JwtPayload = {
        sub: user.id,
        username: user.name,
      };
      const accessToken = this.jwtService.sign(payload);
      return { user: resUser, accessToken };
    }

    throw new UnauthorizedException();
  }

  /**
   * ユーザーをフォローする
   * @param {number} followerId フォローする側のユーザーID
   * @param {number} followingId フォローされる側のユーザーID
   */
  async followUser(followerId: number, followingId: number): Promise<void> {
    if (followerId === followingId) {
      throw new UnauthorizedException('自分自身をフォローすることはできません');
    }

    // フォロー済みかチェック
    const existingFollow = await this.prismaService.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (!existingFollow) {
      await this.prismaService.follow.create({
        data: { followerId, followingId },
      });
    }
  }

  /**
   * ユーザーのフォローを解除する
   * @param {number} followerId フォローを解除する側のユーザーID
   * @param {number} followingId フォローを解除される側のユーザーID
   */
  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    // フォローしているかチェック
    const existingFollow = await this.prismaService.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });

    if (existingFollow) {
      await this.prismaService.follow.delete({
        where: { followerId_followingId: { followerId, followingId } },
      });
    }
  }

  /**
   * 認証チェック機能
   * @param {number} userId
   */
  async authCheck(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('認証データが存在しません');

    const resUser: ResponseUserType = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      profile: user.profile,
      backgroundColor: user.backgroundColor,
      twitter: user.twitter,
      github: user.github,
      facebook: user.facebook,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    };

    const payload: JwtPayload = {
      sub: user.id,
      username: user.name,
    };

    return {
      user: resUser,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
