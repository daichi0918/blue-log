"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import { useState } from "react";
import { Article } from "@/components/molecules/Article";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { ARTICLES_SAMPLE } from "@/constants/article/data";

import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  const [articleDisplayLength, setArticleDisplayLength] = useState<number>(10);
  return (
    <>
      <NotLoginHeader />
      <main className={style.articlesContainer}>
        <section></section>
        <section>
          {ARTICLES_SAMPLE.length > 0 &&
            ARTICLES_SAMPLE.slice(0, articleDisplayLength).map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </section>
        {ARTICLES_SAMPLE.length > articleDisplayLength && (
          <section className={style.showMore}>
            <button className={`${style.button} ${style.buttonSignup}`}>
              もっと見る
            </button>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
