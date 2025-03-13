"use client";

import Image from "next/image";
import { BaseButton } from "@/components/atoms/BaseButton";
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
import { IconContext } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

import style from "./styles.module.css";
import { useArticleTemplate } from "./useArticleTemplate";

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
  const {
    isAuth,
    user,
    isLiked,
    likeCounter,
    isBookmarked,
    showModal,
    inputArticleSearch,
    article,
    isOpen,
    setShowModal,
    handleInputSearch,
    toggleMenu,
    navigateToX,
    navigateToGithub,
    navigateToFacebook,
  } = useArticleTemplate();
  return (
    <>
      <Header
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <PageContainer>
        {article ? (
          <>
            <div className={style.container}>
              <LikeBookmarkButtons
                isliked={isLiked}
                isbookmarked={isBookmarked}
                likeCount={likeCounter}
                direction={"column"}
              />
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
