/**
 * useHomeTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import { fetchArticleListApi } from "@/apis/articleApi";
import { type ArticleCardType } from "@/type/ArticleCard";
import { sortArticles } from "@/utils/sortArticles";

/**
 * useHomeTemplate
 */
export const useHomeTemplate = () => {
  /* state定義 */
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(10);
  const [articleListAll, setArticleListAll] = useState<Array<ArticleCardType>>(
    [],
  );
  const [sortKey, setSortKey] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* action定義 */
  /**
   * もっと見るボタン押下時の処理
   */
  const handleShowMoreArticles = () => {
    setArticleDisplayLength((prev) => prev + 10);
  };

  /**
   * 記事並べ替え関数
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
  };

  // 記事並べ替え
  const sortedArticles = sortArticles(articleListAll, sortKey);

  const fetchArticleCardList = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetchArticleListApi();
      setArticleListAll(
        res?.data && typeof res.data === "object" ? res.data : [],
      );
    } finally {
      setIsLoading(false);
    }
  }, []);
  // 初回レンダリング時に記事一覧を取得
  useEffect(() => {
    void fetchArticleCardList();
  }, [fetchArticleCardList]);

  return {
    articleDisplayLength,
    sortKey,
    sortedArticles,
    isLoading,
    handleShowMoreArticles,
    handleSortChange,
  };
};
