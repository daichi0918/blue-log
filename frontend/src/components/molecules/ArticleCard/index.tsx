"use client";

import type { FC } from "react";
import { memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { type ArticleCardType } from "@/type/ArticleCard";
import { formatDate } from "@/utils/getFormatDate";
import { useRandomColor } from "@/utils/getRandomColor";

import { ArticleInfo } from "../ArticleInfo";
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
export const ArticleCard: FC<ArticleCardProps> = memo((props) => {
  const router = useRouter();
  const randomColor = useRandomColor();
  const { article } = props;

  /**
   * 記事ページに遷移する処理
   * @param {*} id
   * @type {function(*): void}
   */
  const handleMoveDetailPage = useCallback(
    (id: number) => router.push(`${NAVIGATION_PATH.ARTICLE}${id}`),
    [router],
  );

  return (
    <article
      key={article.id}
      className={style.articleItem}
      onClick={() => handleMoveDetailPage(article.id)}
    >
      <section className={style.articleTitle}>
        <h1>{article.title}</h1>
      </section>
      <section className={style.articleTagsWrapper}>
        {article.tags.length > 0 &&
          article.tags.map((tag, index) => (
            <div key={`tag_${index}`} className={style.articleTag}>
              #{tag}
            </div>
          ))}
      </section>
      <section className={style.articleInfoWrapper}>
        <ArticleInfo
          userName={article.user.name}
          image={article.user.image}
          createdAt={article.createdAt}
        />
        <div className={style.likeBookmarkWrapper}>
          <div className={style.like}>
            {article.liked ? (
              <Image
                src="/liked.svg"
                alt={"Liked"}
                className={style.liked}
                width={20}
                height={24}
              />
            ) : (
              <Image
                src="/notLiked.svg"
                alt={"Not Liked"}
                className={style.notLiked}
                width={20}
                height={24}
              />
            )}
            <div className={style.likeCount}>{article.likeCount}</div>
          </div>
          <div className={style.bookmark}>
            {article.bookmark ? (
              <Image
                src="/bookmarked.svg"
                alt={"Bookmarked"}
                width={14}
                height={24}
              />
            ) : (
              <Image
                src="/notBookmarked.svg"
                alt={"Not Bookmarked"}
                width={14}
                height={24}
              />
            )}
          </div>
        </div>
      </section>
    </article>
  );
});
