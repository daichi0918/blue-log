"use client";

/**
 * AccountTemplate
 *
 * @package templates
 */
import { BaseButton } from "@/components/atoms/BaseButton";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { SortSelect } from "@/components/molecules/SortSelect";
import { ArticleCard } from "@/components/organisms/ArticleCard";
import { UserCard } from "@/components/organisms/UserCard";

import style from "./styles.module.css";
import { useAccountTemplate } from "./useAccountTemplate";

/**
 * AccountTemplate
 * @returns {JSX.Element}
 */
export const AccountTemplate = () => {
  const {
    MENU_ITEMS,
    isAuth,
    user,
    inputArticleSearch,
    displayArticles,
    postedArticles,
    selectedIndex,
    displayCount,
    currentUser,
    setSelectedIndex,
    handleInputSearch,
    handleLoadMore,
    handleSortChange,
  } = useAccountTemplate();

  return (
    <>
      <>
        <Header
          user={user}
          isAuth={isAuth}
          searchInputValue={inputArticleSearch}
          handleInputSearch={handleInputSearch}
        />
        <PageContainer>
          {postedArticles && currentUser && (
            <div className={style.container}>
              <aside className={style.sidebarContainer}>
                {currentUser && (
                  <UserCard
                    userId={currentUser.id}
                    userName={currentUser.name}
                    userImage={currentUser.image ?? null}
                    userProfile={currentUser.profile ?? null}
                    twitterURL={currentUser.twitter ?? null}
                    githubURL={currentUser.github ?? null}
                    facebookURL={currentUser.facebook ?? null}
                    profile={currentUser.profile ?? null}
                    followerCount={currentUser.followerCount}
                    followingCount={currentUser.followingCount}
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
        </PageContainer>
        <Footer />
      </>
    </>
  );
};
