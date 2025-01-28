import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserType } from 'src/interfaces/User';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/types/jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
      const payload: JwtPayload = {
        sub: user.id,
        username: user.name,
      };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException();
  }

  // /**
  //  * 認証チェック機能
  //  * @param {number} userId
  //  */
  // async authCheck(userId: number) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   if (!user) throw new UnauthorizedException('認証データが存在しません');

  //   const resUser: ResponseUserType = {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     createdAt: user.createdAt,
  //     updateAt: user.updateAt,
  //   };

  //   const payload: JwtPayload = {
  //     sub: user.id,
  //     username: user.name,
  //   };

  //   return {
  //     user: resUser,
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }
}
