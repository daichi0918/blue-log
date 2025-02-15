"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";
import { UserImage } from "@/components/atoms/UserImage";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { ArticleInfo } from "@/components/molecules/ArticleInfo";
import { LikeBookmarkButtons } from "@/components/molecules/LikeBookmarkButtons";
import { Tags } from "@/components/molecules/Tags";
import { UserCard } from "@/components/organisms/UserCard";
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

      {article ? (
        <>
          <div className={style.container}>
            <section className={style.actionContainer}>
              <div className={style.actionWrapper}>
                <div className={style.actionBackground}>
                  <LikeIcon isliked={article.isLiked} width={20} height={20} />
                </div>
                <p className={style.likeCount}>{article?.likeCount}</p>
              </div>
              <div className={style.actionWrapper}>
                <div className={style.actionBackground}>
                  <BookmarkIcon
                    isbookmarked={article.isBookmarked}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </section>
            <section className={style.contentContainer}>
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
                  <LikeBookmarkButtons
                    isliked={article.isLiked}
                    isbookmarked={article.isBookmarked}
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
                {/* プロフィール文章がnullでなければ表示 */}
                {article.user.profile && (
                  <div className={style.userProfile}>
                    <p className={style.profileText}>{article.user.profile}</p>
                  </div>
                )}
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
              </section>
            </section>
            <section className={style.sidebarContainer}>
              <UserCard
                userName={article.user.name}
                userImage={article.user.image}
                userProfile={article.user.profile}
                twitterURL={article.user.twitter}
                githubURL={article.user.github}
                facebookURL={article.user.facebook}
                mainButtonText={"フォロー"}
              />
            </section>
          </div>
        </>
      ) : (
        <div>もう一度読み込んでください</div>
      )}

      <Footer />
    </>
  );
};
