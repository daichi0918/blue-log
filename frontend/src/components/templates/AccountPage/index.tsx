"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { UserImage } from "@/components/atoms/UserImage";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";
import { IconContext } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

  /**
   * Xへ遷移
   */
  const navigateToX = (url: string | null) => {
    window.open(url ?? "https://twitter.com", "_blank");
  };
  /**
   * GitHubへ遷移
   */
  const navigateToGithub = (url: string | null) => {
    window.open(url ?? "https://github.com", "_blank");
  };
  /**
   * Facebookへ遷移
   */
  const navigateToFacebook = (url: string | null) => {
    window.open(url ?? "https://facebook.com", "_blank");
  };
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
            <div className={style.userProfileWrapper}>
              <div className={style.userInfo}>
                <UserImage
                  image={article.user.image}
                  userName={article.user.name}
                />
                <p className={style.userName}>{article.user.name}</p>
              </div>
              <div className={style.followWrapper}>
                <p>114フォロワー 34フォロー中</p>
              </div>
              {article.user.profile && (
                <div className={style.userProfile}>
                  <p className={style.profileText}>{article.user.profile}</p>
                </div>
              )}
              <BaseButton
                color={"secondary"}
                size={"small"}
                text={"フォロー"}
                additionalStyle={{ width: "100%", margin: "15px 0" }}
              />
              <div className={style.userSnsInfo}>
                <IconContext.Provider
                  value={{ size: "20px", style: { marginRight: "15px" } }}
                >
                  <FaXTwitter
                    onClick={() => navigateToX(article.user.twitter)}
                  />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{ size: "20px", style: { marginRight: "15px" } }}
                >
                  <FaGithub
                    onClick={() => navigateToGithub(article.user.github)}
                  />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{
                    size: "20px",
                    style: { marginRight: "15px", color: "#0966ff" },
                  }}
                >
                  <FaFacebook
                    onClick={() => navigateToFacebook(article.user.facebook)}
                  />
                </IconContext.Provider>
              </div>
            </div>
          </aside>
        </div>
      )}

      <Footer />
    </>
  );
};
