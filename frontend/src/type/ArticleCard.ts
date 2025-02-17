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
    profile: string | null;
    twitter: string | null;
    github: string | null;
    facebook: string | null;
  };
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};
