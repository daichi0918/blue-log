"use client";

import Image from "next/image";
import { BaseButton } from "@/components/atoms/BaseButton";
import { LoadingEffect } from "@/components/atoms/LoadingEffect";
import { ScrollTopIcon } from "@/components/atoms/ScrollTopIcon";
import { SNSIcon } from "@/components/atoms/SNSIcon";
import { UserImage } from "@/components/atoms/UserImage";
import { UserLink } from "@/components/atoms/UserLink";
import { ArticleContentWrapper } from "@/components/layouts/ArticleContentWrapper";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { ArticleInfo } from "@/components/molecules/ArticleInfo";
import { LikeBookmarkButtons } from "@/components/molecules/LikeBookmarkButtons";
import { MarkdonwPreview } from "@/components/molecules/MarkdonwPreview";
import { Tags } from "@/components/molecules/Tags";
import { LoginModal } from "@/components/organisms/LoginModal";
import { UserCard } from "@/components/organisms/UserCard";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
    showModal,
    article,
    isOpen,
    isLoading,
    setShowModal,
    toggleMenu,
    navigateToX,
    navigateToGithub,
    navigateToFacebook,
    navigateToArticleEdit,
  } = useArticleTemplate();
  return (
    <>
      <Header />
      <PageContainer>
        {isLoading ? (
          <LoadingEffect />
        ) : article ? (
          <>
            <div className={style.container}>
              <LikeBookmarkButtons
                isliked={article.isLiked}
                isbookmarked={article.isBookmarked}
                likeCount={article.likeCount}
                direction={"column"}
              />
              <section className={style.contentContainer}>
                {/* <main className={style.contentSection}> */}
                <ArticleContentWrapper>
                  <div className={style.titleContainer}>
                    <div className={style.titleWrapper}>
                      <h1 className={style.title}>{article?.title}</h1>
                    </div>
                    {article?.isAuthor && (
                      <div
                        id={"threeDots"}
                        className={style.meatballMenu}
                        onClick={toggleMenu}
                      >
                        <span className={style.actionDots}></span>
                        <div className={style.actionMenu}>
                          <ul
                            id={"toggleMenu"}
                            className={`${style.menuList} ${isOpen ? style.show : ""}`}
                          >
                            <li
                              className={style.menuItem}
                              onClick={navigateToArticleEdit}
                            >
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
                      color={article.user.backgroundColor}
                      createdAt={article.createdAt}
                    />
                  </div>
                  <MarkdonwPreview text={article.text} />
                  {/* <div className={style.likeBookmarkContainer}>
                    <LikeBookmarkButtons
                      isliked={article.isLiked}
                      isbookmarked={article.isBookmarked}
                      likeCount={article.likeCount}
                    />
                  </div> */}
                </ArticleContentWrapper>
                <section className={style.contentSection}>
                  <div className={style.userInfoFollowButtonWrapper}>
                    <UserLink userId={article.user.id}>
                      <div className={style.userInfo}>
                        <UserImage
                          image={article.user.image}
                          userName={article.user.name}
                          color={article.user.backgroundColor}
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
                    <SNSIcon
                      Icon={FaXTwitter}
                      onClick={() => navigateToX(article.user.twitter)}
                      iconContextValue={{
                        size: "20px",
                        style: { marginRight: "15px" },
                      }}
                    />
                    <SNSIcon
                      Icon={FaGithub}
                      onClick={() => navigateToGithub(article.user.github)}
                      iconContextValue={{
                        size: "20px",
                        style: { marginRight: "15px" },
                      }}
                    />
                    <SNSIcon
                      Icon={FaFacebook}
                      onClick={() => navigateToFacebook(article.user.facebook)}
                      iconContextValue={{
                        size: "20px",
                        style: { marginRight: "15px", color: "#0966ff" },
                      }}
                    />
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
                  color={article.user.backgroundColor}
                  followers={article.user.followers}
                  followerCount={article.user.followerCount}
                  followingCount={article.user.followingCount}
                />
              </section>
              {showModal && <LoginModal onClose={() => setShowModal(false)} />}
            </div>
          </>
        ) : (
          <div>もう一度読み込んでください</div>
        )}
      </PageContainer>
      {/* スクロールトップアイコン */}
      <ScrollTopIcon />
      <Footer />
    </>
  );
};
