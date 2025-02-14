"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { UserImage } from "@/components/atoms/UserImage";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { ArticleInfo } from "@/components/molecules/ArticleInfo";
import { LikeBookarkButtons } from "@/components/molecules/LikeBookmarkButtons";
import { Tags } from "@/components/molecules/Tags";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleType } from "@/type/Article";
import { type EventType } from "@/type/Event";
import { IconContext } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

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
  const [isOpen, setIsOpen] = useState(false);

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
  /**
   * 編集・削除トグル制御
   */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
        <section className={style.actionContainer}>aaa</section>
        <section className={style.contentContainer}>
          {article ? (
            <>
              <main className={style.contentSection}>
                <div className={style.titleContainer}>
                  <div className={style.titleWrapper}>
                    <h1 className={style.title}>{article?.title}</h1>
                  </div>
                  {article?.isAuthor && (
                    <div className={style.meatballMenu} onClick={toggleMenu}>
                      <span className={style.actionDots}></span>
                      <div className={style.actionMenu}>
                        <ul
                          className={`${style.menuList} ${isOpen ? style.show : ""}`}
                        >
                          <li className={style.menuItem}>
                            <Image
                              src="/edit.svg"
                              alt="edit"
                              width={16}
                              height={16}
                            />
                            <p>編集</p>
                          </li>
                          <li className={style.menuItem}>
                            <Image
                              src="/delete.svg"
                              alt="delete"
                              width={16}
                              height={16}
                            />
                            <p>削除</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className={style.articleTagsWrapper}>
                  <Tags contents={article.tags} />
                </div>
                <div className={style.articleInfoWrapper}>
                  <ArticleInfo
                    userName={article.user.name}
                    image={article.user.image}
                    createdAt={article.createdAt}
                  />
                </div>
                <ReactMarkdown className={style.markdown}>
                  {article.text}
                </ReactMarkdown>
                <div className={style.likeBookmarkContainer}>
                  <LikeBookarkButtons
                    isliked={article.isLiked}
                    isBookmarked={article.isBookmarked}
                    likeCount={article.likeCount}
                  />
                </div>
              </main>
              <section className={style.contentSection}>
                <div className={style.userInfoFollowButtonWrapper}>
                  <div className={style.userInfo}>
                    <UserImage
                      image={article.user.image}
                      userName={article.user.name}
                    />
                    <p className={style.userName}>{article.user.name}</p>
                  </div>
                  <div className={style.followButtonWrapper}>
                    <BaseButton
                      color={"secondary"}
                      size={"medium"}
                      text={"フォロー"}
                    />
                  </div>
                </div>
                <div className={style.userProfile}>
                  <p className={style.profileText}>
                    プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。プロフィールの文章です。
                  </p>
                </div>
                <div className={style.userSnsInfo}>
                  <IconContext.Provider
                    value={{ size: "20px", style: { marginRight: "15px" } }}
                  >
                    <FaXTwitter />
                  </IconContext.Provider>
                  <IconContext.Provider
                    value={{ size: "20px", style: { marginRight: "15px" } }}
                  >
                    <FaGithub />
                  </IconContext.Provider>
                  <IconContext.Provider
                    value={{
                      size: "20px",
                      style: { marginRight: "15px", color: "#0966ff" },
                    }}
                  >
                    <FaFacebook />
                  </IconContext.Provider>
                </div>
              </section>
            </>
          ) : (
            <div>もう一度読み込んでください</div>
          )}
        </section>
        <section className={style.sidebarContainer}>ccc</section>
      </div>
      <Footer />
    </>
  );
};
