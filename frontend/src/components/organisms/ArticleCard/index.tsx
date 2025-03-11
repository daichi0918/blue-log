"use client";

import type { FC } from "react";
import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { type ArticleCardType } from "@/type/ArticleCard";

import { ArticleInfo } from "../../molecules/ArticleInfo";
import { LikeBookmarkButtons } from "../../molecules/LikeBookmarkButtons";
import { Tags } from "../../molecules/Tags";
import style from "./styles.module.css";

/**
 * ArticleCard
 *
 * @package molecules
 */

type ArticleCardProps = {
  article: ArticleCardType;
};

/**
 * Article
 * @param {ArticleProps}
 * @returns {JSX.Element}
 */
export const ArticleCard = memo((props: ArticleCardProps) => {
  const router = useRouter();
  const { article } = props;

  /**
   * 記事ページに遷移する処理
   * @param {*} id
   * @type {function(*): void}
   */
  const handleMoveDetailPage = useCallback(
    (id: number, event: React.MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      const modal = targetElement.closest("[data-like-bookmark]");
      const likeBookmarkWrapper = targetElement.closest("[data-modal]");
      // いいね・ブックマークを押下した際は遷移しない
      if (modal || likeBookmarkWrapper) {
        return;
      }

      router.push(`${NAVIGATION_PATH.ARTICLE}${id}`);
    },
    [router],
  );

  return (
    <article
      key={article.id}
      className={style.articleItem}
      onClick={(event) => handleMoveDetailPage(article.id, event)}
    >
      <section className={style.articleTitle}>
        <h1>{article.title}</h1>
      </section>
      <section className={style.articleTagsWrapper}>
        <Tags contents={article.tags} />
      </section>
      <section className={style.articleInfoWrapper}>
        <ArticleInfo
          userId={article.user.id}
          userName={article.user.name}
          image={article.user.image}
          createdAt={article.createdAt}
        />
        <LikeBookmarkButtons
          isliked={article.isLiked}
          isbookmarked={article.isBookmarked}
          likeCount={article.likeCount}
          articleId={String(article.id)}
          data-like-bookmark
        />
      </section>
    </article>
  );
});
