/**
 * useHomeTemplate
 *
 * @package templates
 */
import { useCallback, useState } from "react";
import { fetchArticleListApi } from "@/apis/articleApi";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";

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

  const fetchArticleCardList = useCallback(async (): Promise<void> => {
    const res = await fetchArticleListApi();
    setArticleListAll(
      res?.data && typeof res.data === "object" ? res.data : [],
    );
  }, []);

  return {
    articleDisplayLength,
    inputArticleSearch,
    articleListAll,
    handleInputSearch,
    handleShowMoreArticles,
    fetchArticleCardList,
  };
};
