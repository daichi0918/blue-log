/**
 * ArticleCard
 *
 * @package interface
 */

/**
 * ArticleCardType
 */
export type ArticleCardType = {
  id: number;
  title: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    image: string | null;
  };
  likeCount: number;
  liked: boolean;
  bookmark: boolean;
};
