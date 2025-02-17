"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchArticleListApi } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { SortSelect } from "@/components/molecules/SortSelect";
import { UserCard } from "@/components/organisms/UserCard";
import { NAVIGATION_LIST } from "@/constants/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { type ArticleCardType } from "@/type/ArticleCard";
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
  // const router = useRouter();
  const param = useParams();

  const { isAuth, user } = useContext(AuthContext);
  /* ログインしていなかったらhomeに戻る */
  // if (!isAuth) {
  //   router.push(NAVIGATION_LIST.TOP);
  // }

  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [article, setArticle] = useState<Array<ArticleCardType>>();
  const [selectedIndex, setSelectedIndex] = useState(0); // 最初の項目を選択
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(5);

  const menuItems = ["投稿した記事", "いいねした記事", "保存した記事"];

  const fetchArticleCardList = useCallback(async (): Promise<void> => {
    const res = await fetchArticleListApi();
    setArticle(res?.data && typeof res.data === "object" ? res.data : []);
  }, []);
  useEffect(() => {
    void fetchArticleCardList();
  }, [param, fetchArticleCardList]);

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
  const handleShowMoreArticles = () => {
    setArticleDisplayLength((prev) => prev + 10);
  };

  return (
    <>
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
              {user && (
                <UserCard
                  userName={user.name}
                  userImage={user.image ?? null}
                  userProfile={user.profile ?? null}
                  twitterURL={user.twitter ?? null}
                  githubURL={user.github ?? null}
                  facebookURL={user.facebook ?? null}
                  mainButtonText={"マイページを編集"}
                />
              )}
            </aside>
            <main className={style.mainContainer}>
              <div className={style.mainContentWrapper}>
                <nav className={style.navContent}>
                  <ul className={style.articleSelectList}>
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={index === selectedIndex ? style.select : ""}
                        onClick={() => setSelectedIndex(index)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </nav>
                <section className={style.articleCardSort}>
                  <SortSelect />
                </section>
                <section className={style.articleCardDisplay}>
                  {article?.length > 0 &&
                    article
                      .slice(0, articleDisplayLength)
                      .map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                </section>
                {/* もっと見るボタン */}
                {article.length > articleDisplayLength && (
                  <section className={style.showMore}>
                    <BaseButton
                      color={"secondary"}
                      size={"medium"}
                      text={"もっと見る"}
                      onClick={handleShowMoreArticles}
                    />
                  </section>
                )}
              </div>
            </main>
          </div>
        )}

        <Footer />
      </>
    </>
  );
};
