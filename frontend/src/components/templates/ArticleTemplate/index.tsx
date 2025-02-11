"use client";

import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { useAuth } from "@/hooks/useAuth";
import { type EventType } from "@/type/Event";

/**
 * ArticleTemplate
 *
 * @package templates
 */

/**
 * ArticleTemplate
 * @returns {JSX.Element}
 */
export const ArticleTemplate = () => {
  const param = useParams();
  console.log("param");
  console.log(param);
  // 認証情報を取得
  const { isAuth, user } = useAuth();
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  /* action定義 */

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  return (
    <>
      <NotLoginHeader
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />

      <Footer />
    </>
  );
};
