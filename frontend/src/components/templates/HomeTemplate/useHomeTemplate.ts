/**
 * useHomeTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import { fetchArticleListApi } from "@/apis/articleApi";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";
import { sortArticles } from "@/utils/sortArticles";

/**
 * useHomeTemplate
 */
export const useHomeTemplate = () => {
  /* state定義 */
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(10);
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [articleListAll, setArticleListAll] = useState<Array<ArticleCardType>>(
    [],
  );
  const [sortKey, setSortKey] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* action定義 */

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
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
    inputArticleSearch,
    sortKey,
    sortedArticles,
    isLoading,
    handleInputSearch,
    handleShowMoreArticles,
    handleSortChange,
  };
};
