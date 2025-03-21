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
    displayArticles,
    postedArticles,
    selectedIndex,
    displayCount,
    profileUser,
    setSelectedIndex,
    handleLoadMore,
    handleSortChange,
  } = useAccountTemplate();

  return (
    <>
      <>
        <Header />
        <PageContainer>
          {postedArticles && profileUser && (
            <div className={style.container}>
              <aside className={style.sidebarContainer}>
                {profileUser && (
                  <UserCard
                    userId={profileUser.id}
                    userName={profileUser.name}
                    userImage={profileUser.image ?? null}
                    userProfile={profileUser.profile ?? null}
                    twitterURL={profileUser.twitter ?? null}
                    githubURL={profileUser.github ?? null}
                    facebookURL={profileUser.facebook ?? null}
                    profile={profileUser.profile ?? null}
                    color={profileUser.backgroundColor}
                    followerCount={profileUser.followerCount}
                    followingCount={profileUser.followingCount}
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
