/**
 * useHomeTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchArticleListApi } from "@/apis/articleApi";
import { ArticleContext } from "@/contexts/ArticleContext";
import { type ArticleCardType } from "@/type/ArticleCard";
import { sortArticles } from "@/utils/sortArticles";

/**
 * useHomeTemplate
 */
export const useHomeTemplate = () => {
  /* local state定義 */
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(10);
  const [articleListAll, setArticleListAll] = useState<Array<ArticleCardType>>(
    [],
  );
  const [sortKey, setSortKey] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* global state定義 */
  const { inputArticleSearch } = useContext(ArticleContext);

  /* action定義 */
  /**
   * もっと見るボタン押下時の処理
   */
  const handleShowMoreArticles = () => {
    setArticleDisplayLength((prev) => prev + 10);
  };
  /**
   * 表示用TodoList
   */
  const showArticleList = useMemo(() => {
    return articleListAll.filter((article) => {
      const regexp = new RegExp("^" + inputArticleSearch, "i");
      return article.title.match(regexp);
    });
  }, [inputArticleSearch, articleListAll]);

  /**
   * 記事並べ替え関数
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
  };

  // 記事並べ替え
  const sortedArticles = sortArticles(showArticleList, sortKey);

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
