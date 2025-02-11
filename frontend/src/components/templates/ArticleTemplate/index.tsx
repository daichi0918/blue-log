"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { useAuth } from "@/hooks/useAuth";
import { type ArticleType } from "@/type/Article";
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
  // 認証情報を取得
  const { isAuth, user } = useAuth();
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [articleValue, setArticleValue] = useState<ArticleType>();
  /* action定義 */

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  /**
   * 記事データ取得
   */
  const fetchArticleById = useCallback(async (): Promise<void> => {
    const res = await fetchArticleAPI(String(param.id));
    console.log("res");
    console.log(res);
    setArticleValue(
      res?.data && typeof res.data === "object" ? res.data : undefined,
    );
  }, [param]);

  useEffect(() => {
    void fetchArticleById();
  }, [param, fetchArticleById]);
  return (
    <>
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />

      <Footer />
    </>
  );
};
