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
      where: {
        email,
      },
    });

    if (!!user) {
      throw new UnauthorizedException(
        `${email} は別のアカウントで使用されています。`,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const resUser: ResponseUserType = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      image: createdUser.image,
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
