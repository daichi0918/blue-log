"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchArticleAPI } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";
import { UserImage } from "@/components/atoms/UserImage";
import { UserLink } from "@/components/atoms/UserLink";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { ArticleInfo } from "@/components/molecules/ArticleInfo";
import { LikeBookmarkButtons } from "@/components/molecules/LikeBookmarkButtons";
import { Modal } from "@/components/molecules/Modal";
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
  /* state */
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  /* action */
  const toggleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isAuth) {
      setShowModal(true);
    } else {
      setIsLiked((prev) => !prev);
      setLikeCounter((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  const toggleBookmark = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isAuth) {
      setShowModal(true);
    } else {
      setIsBookmarked((prev) => !prev);
      setLikeCounter((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  useEffect(() => {
    void fetchArticleById();
    if (article) {
      setIsLiked(article.isLiked);
      setIsBookmarked(article.isBookmarked);
      setLikeCounter(article.likeCount);
    }
  }, [param, fetchArticleById, article]);
  return (
    <>
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <PageContainer>
        {article ? (
          <>
            <div className={style.container}>
              <section className={style.actionContainer}>
                <div className={style.actionWrapper}>
                  <div className={style.actionBackground}>
                    <LikeIcon
                      isliked={isLiked}
                      width={20}
                      height={20}
                      onClick={(event) => {
                        toggleLike(event);
                      }}
                    />
                  </div>
                  <p className={style.likeCount}>{likeCounter}</p>
                </div>
                <div className={style.actionWrapper}>
                  <div className={style.actionBackground}>
                    <BookmarkIcon
                      isbookmarked={isBookmarked}
                      width={20}
                      height={20}
                      onClick={(event) => {
                        toggleBookmark(event);
                      }}
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
                      userId={article.user.id}
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
                      isliked={isLiked}
                      isbookmarked={isBookmarked}
                      likeCount={likeCounter}
                    />
                  </div>
                </main>
                <section className={style.contentSection}>
                  <div className={style.userInfoFollowButtonWrapper}>
                    <UserLink userId={article.user.id}>
                      <div className={style.userInfo}>
                        <UserImage
                          image={article.user.image}
                          userName={article.user.name}
                        />
                        <p className={style.userName}>{article.user.name}</p>
                      </div>
                    </UserLink>
                    <div className={style.followButtonWrapper}>
                      <BaseButton
                        color={"secondary"}
                        size={"medium"}
                        text={
                          !isAuth
                            ? "フォロー"
                            : article.user.id === user?.id
                              ? "プロフィールを編集"
                              : article.user.followers?.includes(user?.id ?? -1)
                                ? "フォローを外す"
                                : "フォロー"
                        }
                      />
                    </div>
                  </div>
                  {/* プロフィール文章がnullでなければ表示 */}
                  {article.user.profile && (
                    <div className={style.userProfile}>
                      <p className={style.profileText}>
                        {article.user.profile}
                      </p>
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
                        onClick={() =>
                          navigateToFacebook(article.user.facebook)
                        }
                      />
                    </IconContext.Provider>
                  </div>
                </section>
              </section>
              <section className={style.sidebarContainer}>
                <UserCard
                  userId={article.user.id}
                  userName={article.user.name}
                  userImage={article.user.image}
                  userProfile={article.user.profile}
                  twitterURL={article.user.twitter}
                  githubURL={article.user.github}
                  facebookURL={article.user.facebook}
                  profile={article.user.profile}
                  followers={article.user.followers}
                  followerCount={article.user.followerCount}
                  followingCount={article.user.followingCount}
                />
              </section>
              {showModal && <Modal onClose={() => setShowModal(false)} />}
            </div>
          </>
        ) : (
          <div>もう一度読み込んでください</div>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};
