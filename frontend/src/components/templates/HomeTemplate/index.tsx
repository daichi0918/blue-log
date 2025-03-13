"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import { useContext } from "react";
import { BaseButton } from "@/components/atoms/BaseButton";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { SortSelect } from "@/components/molecules/SortSelect";
import { ArticleCard } from "@/components/organisms/ArticleCard";
import { AuthContext } from "@/contexts/AuthContext";

import style from "./styles.module.css";
import { useHomeTemplate } from "./useHomeTemplate";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  // HomeTemplateのカスタムフックを使用
  const {
    articleDisplayLength,
    inputArticleSearch,
    sortedArticles,
    handleInputSearch,
    handleShowMoreArticles,
    handleSortChange,
  } = useHomeTemplate();

  return (
    <>
      {/* ヘッダー */}
      <Header
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <PageContainer>
        <main className={style.articlesContainer}>
          {/* 並び替え */}
          <section className={style.articleCardSort}>
            <SortSelect onChange={handleSortChange} />
          </section>
          {/* 記事一覧リスト */}
          <section>
            {sortedArticles.length > 0 &&
              sortedArticles
                .slice(0, articleDisplayLength)
                .map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
          </section>
          {/* もっと見るボタン */}
          {sortedArticles.length > articleDisplayLength && (
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
      </PageContainer>

      {/* フッター */}
      <Footer />
    </>
  );
};
