"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { UserCard } from "@/components/organisms/UserCard";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

/**
 * AccountTemplate
 *
 * @package templates
 */

/**
 * AccountTemplate
 * @returns {JSX.Element}
 */
export const AccountTemplate = () => {
  const param = useParams();
  const { isAuth, user } = useContext(AuthContext);
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [article, setArticle] = useState<ArticleType>();

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

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);

  return (
    <>
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      {article && (
        <div className={style.container}>
          <aside className={style.sidebarContainer}>
            <UserCard
              userName={article.user.name}
              userImage={article.user.image}
              userProfile={article.user.profile}
              twitterURL={article.user.twitter}
              githubURL={article.user.github}
              facebookURL={article.user.facebook}
              mainButtonText={"マイページを編集"}
            />
          </aside>
        </div>
      )}

      <Footer />
    </>
  );
};
