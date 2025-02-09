"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import { useEffect } from "react";
import { BaseButton } from "@/components/atoms/BaseButton";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { useAuth } from "@/hooks/useAuth";

import style from "./styles.module.css";
import { useHomeTemplate } from "./useHomeTemplate";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  // 認証情報を取得
  const { isAuth, user } = useAuth();
  // HomeTemplateのカスタムフックを使用
  const {
    articleDisplayLength,
    inputArticleSearch,
    articleListAll,
    handleInputSearch,
    handleShowMoreArticles,
    fetchArticleCardList,
  } = useHomeTemplate();
  // 初回レンダリング時に記事一覧を取得
  useEffect(() => {
    void fetchArticleCardList();
  }, [fetchArticleCardList]);

  return (
    <>
      {/* ヘッダー */}
      <NotLoginHeader
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <main className={style.articlesContainer}>
        {/* 並び替え */}
        <section className={style.articleCardSort}>
          <div className={style.sortTitleWrapper}>
            <p className={style.sortTitle}>並び順</p>
          </div>
          <div className={style.selectWrapper}>
            <select className={style.select}>
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
              <option value="likes">いいね順</option>
            </select>
          </div>
        </section>
        {/* 記事一覧リスト */}
        <section>
          {articleListAll.length > 0 &&
            articleListAll
              .slice(0, articleDisplayLength)
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
        </section>
        {/* もっと見るボタン */}
        {articleListAll.length > articleDisplayLength && (
          <section className={style.showMore}>
            <BaseButton
              color={"secondary"}
              size={"medium"}
              text={"もっと見る"}
              onClick={handleShowMoreArticles}
            />
          </section>
        )}
      </main>
      {/* フッター */}
      <Footer />
    </>
  );
};
