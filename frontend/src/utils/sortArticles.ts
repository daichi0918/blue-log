import { type ArticleCardType } from "@/type/ArticleCard";

/**
 * 記事を並び替える関数
 * @param {ArticleCardType[]} articles
 * @param {string}sortKey
 * @returns {ArticleCardType[] | 0}
 */
export const sortArticles = (
  articles: ArticleCardType[],
  sortKey: string,
): ArticleCardType[] => {
  return [...articles].sort((a, b) => {
    switch (sortKey) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "likes":
        return (b.likeCount ?? 0) - (a.likeCount ?? 0);
      default:
        return 0;
    }
  });
};
