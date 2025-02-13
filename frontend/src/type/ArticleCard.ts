/**
 * ArticleCard
 *
 * @package type
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
  isLiked: boolean;
  isBookmarked: boolean;
};
