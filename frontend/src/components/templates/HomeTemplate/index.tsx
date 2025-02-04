"use client";

/**
 * HomeTemplate
 *
 * @package templates
 */
import Image from "next/image";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { ARTICLES_SAMPLE } from "@/constants/article/data";
import { formatDate } from "@/utils/getFormatDate";
import { getRandomColor } from "@/utils/getRandomColor";

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
              <article key={article.id}>
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
                <section className={style.articleInfo}>
                  <div className={style.userInfo}>
                    <div className={style.userImg}>
                      {article.user.image ? (
                        <img src={article.user.image} alt={article.user.name} />
                      ) : (
                        <span
                          style={{ background: getRandomColor() }}
                          className={style.noUserImg}
                        >
                          {article.user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className={style.nameDateWrapper}>
                      <p className={style.userName}>{article.user.name}</p>
                      <p className={style.date}>
                        {formatDate(article.createdAt)}
                      </p>
                    </div>
                  </div>
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
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
};
