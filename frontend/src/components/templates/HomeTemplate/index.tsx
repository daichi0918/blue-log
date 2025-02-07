"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import { fetchArticleListApi } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { ARTICLES_SAMPLE } from "@/constants/article/data";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  /* state定義 */
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(10);
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [articleListAll, setArticleListAll] = useState<Array<ArticleCardType>>(
    [],
  );

  /* action定義 */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
  const handleShowMoreArticles = () => {
    setArticleDisplayLength((prev) => prev + 10);
  };

  const fetchArticleCardList = useCallback(async (): Promise<void> => {
    const res = await fetchArticleListApi();
    console.log("res");
    console.log(res);
    setArticleListAll(
      res?.data && typeof res.data === "object" ? res.data : [],
    );
  }, []);
  useEffect(() => {
    void fetchArticleCardList();
  }, [fetchArticleCardList]);

  return (
    <>
      <NotLoginHeader
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
          {ARTICLES_SAMPLE.length > 0 &&
            ARTICLES_SAMPLE.slice(0, articleDisplayLength).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
        </section>
        {/* もっと見るボタン */}
        {ARTICLES_SAMPLE.length > articleDisplayLength && (
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
      <Footer />
    </>
  );
};
