"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  fetchArticlesByUserId,
  fetchBookmarkedArticlesByUserIdAPI,
  fetchLikedArticlesByUserIdAPI,
} from "@/apis/articleApi";
import { fetchUserById } from "@/apis/authApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { SortSelect } from "@/components/molecules/SortSelect";
import { UserCard } from "@/components/organisms/UserCard";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";
import { type UserType } from "@/type/User";

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
  const MENU_ITEMS = ["投稿した記事", "いいねした記事", "保存した記事"];

  const { isAuth, user } = useContext(AuthContext);
  /* state定義 */
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [displayArticles, setDisplayArticles] = useState<
    Array<ArticleCardType>
  >([]);
  const [postedArticles, setPostedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [likedArticles, setLikedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [savedArticles, setSavedArticles] = useState<Array<ArticleCardType>>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [sortKey, setSortKey] = useState<string>("newest");
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined,
  );

  /* action定義 */

  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  /**
   * もっと見るボタン押下時の処理
   */
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };
  /**
   * 記事並べ替え関数
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
  };
  const sortArticles = useCallback(
    (articles: ArticleCardType[]) => {
      return [...articles].sort((a, b) => {
        switch (sortKey) {
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "likes":
            return (b.likeCount ?? 0) - (a.likeCount ?? 0);
          default:
            return 0;
        }
      });
    },
    [sortKey],
  );
  /**
   * 特定のユーザーが投稿した記事を取得・反映
   */
  const fetchUserPostedArticles = useCallback(async (): Promise<void> => {
    if (postedArticles.length === 0) {
      const res = await fetchArticlesByUserId(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setPostedArticles(data);
      setDisplayArticles(sortArticles(data));
    } else {
      setDisplayArticles(sortArticles(postedArticles));
    }
  }, [param.id, postedArticles, sortArticles]);
  /**
   * 特定のユーザーがいいねした記事を取得・反映
   */
  const fetchUserLikedArticles = useCallback(async (): Promise<void> => {
    if (likedArticles.length === 0) {
      const res = await fetchLikedArticlesByUserIdAPI(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setLikedArticles(data);
      setDisplayArticles(sortArticles(data));
    } else {
      setDisplayArticles(sortArticles(likedArticles));
    }
  }, [param.id, likedArticles, sortArticles]);

  /**
   * 特定のユーザー取得
   */
  const fetchUser = useCallback(async (): Promise<void> => {
    const res = await fetchUserById(String(param.id));
    setCurrentUser(
      res?.data && typeof res.data === "object" ? res.data : undefined,
    );
  }, [param]);

  /**
   * 特定のユーザーが保存した記事を取得・反映
   */
  const fetchUserSavedArticles = useCallback(async (): Promise<void> => {
    if (savedArticles.length === 0) {
      const res = await fetchBookmarkedArticlesByUserIdAPI(String(param.id));
      const data = res?.data && typeof res.data === "object" ? res.data : [];
      setSavedArticles(data);
      setDisplayArticles(sortArticles(data));
    } else {
      setDisplayArticles(sortArticles(savedArticles));
    }
  }, [param.id, savedArticles, sortArticles]);

  useEffect(() => {
    // ユーザー取得
    void fetchUser();
    // 記事一覧取得
    switch (selectedIndex) {
      case 0:
        void fetchUserPostedArticles();
        break;
      case 1:
        void fetchUserLikedArticles();
        break;
      case 2:
        void fetchUserSavedArticles();
        break;
    }
  }, [
    selectedIndex,
    fetchUserPostedArticles,
    fetchUserLikedArticles,
    fetchUserSavedArticles,
    fetchUser,
    sortKey,
    param.id,
  ]);

  return (
    <>
      <>
        <Header
          user={user}
          isAuth={isAuth}
          searchInputValue={inputArticleSearch}
          handleInputSearch={handleInputSearch}
        />
        <div className={style.pageContainer}>
          {postedArticles && currentUser && (
            <div className={style.container}>
              <aside className={style.sidebarContainer}>
                {currentUser && (
                  <UserCard
                    userName={currentUser.name}
                    userImage={currentUser.image ?? null}
                    userProfile={currentUser.profile ?? null}
                    twitterURL={currentUser.twitter ?? null}
                    githubURL={currentUser.github ?? null}
                    facebookURL={currentUser.facebook ?? null}
                    profile={currentUser.profile ?? null}
                    follower={currentUser.followerCount}
                    following={currentUser.followingCount}
                    isAuth={isAuth}
                  />
                )}
              </aside>
              <main className={style.mainContainer}>
                <div className={style.mainContentWrapper}>
                  <nav className={style.navContent}>
                    <ul className={style.articleSelectList}>
                      {MENU_ITEMS.map((item, index) => (
                        <li
                          key={index}
                          className={
                            index === selectedIndex ? style.select : ""
                          }
                          onClick={() => setSelectedIndex(index)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <section className={style.articleCardSort}>
                    <SortSelect onChange={handleSortChange} />
                  </section>
                  <section className={style.articleCardDisplay}>
                    {displayArticles.length > 0 &&
                      displayArticles
                        .slice(0, displayCount)
                        .map((article) => (
                          <ArticleCard key={article.id} article={article} />
                        ))}
                  </section>
                  {/* もっと見るボタン */}
                  {displayArticles.length > displayCount && (
                    <section className={style.showMore}>
                      <BaseButton
                        color={"secondary"}
                        size={"medium"}
                        text={"もっと見る"}
                        onClick={handleLoadMore}
                      />
                    </section>
                  )}
                </div>
              </main>
            </div>
          )}
        </div>
        <Footer />
      </>
    </>
  );
};
