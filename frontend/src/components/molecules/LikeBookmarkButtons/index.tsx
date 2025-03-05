"use client";

import { memo, useContext, useEffect, useState } from "react";
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
};

export const LikeBookmarkButtons = memo((props: LikeBookarkButtonsProps) => {
  const param = useParams();
  const { isliked, isbookmarked, likeCount } = props;
  const { isAuth } = useContext(AuthContext);

  /* state */
  const [isLiked, setIsLiked] = useState(isliked);
  const [likeCounter, setLikeCounter] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(isbookmarked);
  const [showModal, setShowModal] = useState(false);

  /* action */
  const toggleLike = (event: React.MouseEvent) => {
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
  };

  const toggleBookmark = (event: React.MouseEvent) => {
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
  };

  useEffect(() => {
    setLikeCounter(likeCount);
  }, [likeCount]);
  return (
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
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
});
