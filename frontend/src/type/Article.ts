/**
 * Article
 *
 * @package type
 */

/**
 * ArticleType
 */
export type ArticleType = {
  id: number;
  title: string;
  text: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    image: string | null;
    twitter: string | null;
    github: string | null;
    facebook: string | null;
    profile: string | null;
  };
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isAuthor: boolean;
};
