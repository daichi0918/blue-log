/**
 * useArticle
 *
 * @package hooks
 */
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { type EventType } from "@/type/Event";

/**
 * useArticle
 */
export const useArticle = () => {
  const router = useRouter();
  /* state定義 */
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  /* action定義 */
  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);

  return {
    inputArticleSearch,
    handleInputSearch,
  };
};
