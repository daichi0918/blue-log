"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
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
  return (
    <>
      <NotLoginHeader />
      <main className={style.articlesContainer}>
        <section></section>
        <section>
          {ARTICLES_SAMPLE.length > 0 &&
            ARTICLES_SAMPLE.map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
};
