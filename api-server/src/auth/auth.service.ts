import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserType } from 'src/interfaces/User';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

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
    // const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        // password: hashedPassword,
      },
    });

    const resUser: ResponseUserType = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updateAt: createdUser.updateAt,
    };

    // const payload: JwtPayload = {
    //   sub: createdUser.id,
    //   username: createdUser.name,
    // };
    return {
      user: resUser,
      // accessToken: this.jwtService.sign(payload),
    };
  }

  async signIn(credentialsDto: CredentialsDto): Promise<any> {
    const { email, password } = credentialsDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return { user };
    //   if (user && (await bcrypt.compare(password, user.password))) {
    //     const payload: JwtPayload = {
    //       sub: user.id,
    //       username: user.name,
    //     };
    //     const token = this.jwtService.sign(payload);
    //     return { token };
    //   }

    //   throw new UnauthorizedException();
    // }
  }
}
