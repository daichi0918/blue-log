"use client";

import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  addLikeApi,
  deleteLikeApi,
  saveBookmarkApi,
  unsaveBookmarkApi,
} from "@/apis/articleApi";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";
import { Modal } from "@/components/molecules/Modal";
import { AuthContext } from "@/contexts/AuthContext";

import style from "./styles.module.css";

/**
 * LikeBookarkButtons
 *
 * @package molecules
 */

type LikeBookarkButtonsProps = {
  isliked: boolean;
  isbookmarked: boolean;
  likeCount: number;
  direction?: "row" | "column";
};

export const LikeBookmarkButtons = memo((props: LikeBookarkButtonsProps) => {
  const param = useParams();
  const { isliked, isbookmarked, likeCount, direction = "row" } = props;
  const { isAuth } = useContext(AuthContext);

  /* state */
  const [isLiked, setIsLiked] = useState(isliked);
  const [likeCounter, setLikeCounter] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(isbookmarked);
  const [showModal, setShowModal] = useState(false);
  /* action */
  const toggleLike = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      // TODO: 記事一覧画面では、いいね!ボタン押下した後に記事詳細ページに遷移するからそこの制御の実装
      if (!isAuth) {
        setShowModal(true);
      } else {
        setIsLiked((prev) => !prev);
        setLikeCounter((prev) => (isLiked ? prev - 1 : prev + 1));
        if (isLiked) {
          void deleteLikeApi(String(param.id));
        } else {
          void addLikeApi(String(param.id));
        }
      }
    },
    [isAuth, param.id, isLiked],
  );

  const toggleBookmark = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      // TODO: 記事一覧画面では、いいね!ボタン押下した後に記事詳細ページに遷移するからそこの制御の実装
      if (!isAuth) {
        setShowModal(true);
      } else {
        setIsBookmarked((prev) => !prev);
        if (isBookmarked) {
          void unsaveBookmarkApi(String(param.id));
        } else {
          void saveBookmarkApi(String(param.id));
        }
      }
    },
    [isAuth, param.id, isBookmarked],
  );

  useEffect(() => {
    setIsLiked(isliked);
    setLikeCounter(likeCount);
    setIsBookmarked(isbookmarked);
  }, [likeCount, isliked, isbookmarked]);
  return (
    <>
      {direction === "row" ? (
        <>
          <div className={style.likeBookmarkWrapper}>
            <div className={style.like}>
              <LikeIcon
                isliked={isLiked}
                width={22}
                height={22}
                onClick={(event) => {
                  toggleLike(event);
                }}
              />
              <div className={style.likeCount}>{likeCounter}</div>
            </div>
            <div className={style.bookmark}>
              <BookmarkIcon
                isbookmarked={isBookmarked}
                width={18}
                height={22}
                onClick={(event) => {
                  toggleBookmark(event);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <section className={style.actionContainer}>
          <div className={style.actionWrapper}>
            <div className={style.actionBackground}>
              <LikeIcon
                isliked={isLiked}
                width={20}
                height={20}
                onClick={(event) => {
                  toggleLike(event);
                }}
              />
            </div>
            <p className={style.likeCount}>{likeCounter}</p>
          </div>
          <div className={style.actionWrapper}>
            <div className={style.actionBackground}>
              <BookmarkIcon
                isbookmarked={isBookmarked}
                width={20}
                height={20}
                onClick={(event) => {
                  toggleBookmark(event);
                }}
              />
            </div>
          </div>
        </section>
      )}

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
});
