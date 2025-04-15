import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: 4 })
  id: number;

  @ApiProperty({ example: 'test-user3' })
  name: string;

  @ApiProperty({ example: null, nullable: true })
  image: string | null;
}

export class ArticleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Title2' })
  title: string;

  @ApiProperty({ example: ['TypeScript', 'Nuxt.js'], type: [String] })
  tags: string[];

  @ApiProperty({ example: '2025-01-30T11:02:45.000Z', format: 'date-time' })
  createdAt: string;

  @ApiProperty({ example: '2025-01-30T11:02:45.000Z', format: 'date-time' })
  updatedAt: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ example: 1 })
  likeCount: number;

  @ApiProperty({ example: false })
  liked: boolean;

  @ApiProperty({ example: false })
  bookmark: boolean;
}

export class ResponseDto {
  @ApiProperty({ type: [ArticleDto] })
  items: ArticleDto[];
}
