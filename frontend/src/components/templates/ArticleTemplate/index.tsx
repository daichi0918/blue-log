"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

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
  const { isAuth, user } = useContext(AuthContext);
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [article, setArticle] = useState<ArticleType>();
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
    setArticle(
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
      <div className={style.container}>
        <div className={style.actionContainer}>aaa</div>
        <div className={style.contentContainer}>
          <div className={style.titleContainer}>
            <h1>{article?.title}</h1>
            {article?.isAuthor && (
              <div className={style.threePoint}>3点リーダー</div>
            )}
            <div></div>
          </div>
        </div>
        <div className={style.sidebarContainer}>ccc</div>
      </div>
      <Footer />
    </>
  );
};
