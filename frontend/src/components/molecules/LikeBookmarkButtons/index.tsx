"use client";

import type { FC } from "react";
import { memo } from "react";
import Image from "next/image";

import style from "./styles.module.css";

/**
 * LikeBookarkButtonsProps
 *
 * @package molecules
 */

type LikeBookarkButtonsProps = {
  isliked: boolean;
  isBookmarked: boolean;
  likeCount: number;
};

export const LikeBookarkButtons: FC<LikeBookarkButtonsProps> = memo((props) => {
  const { isliked, isBookmarked, likeCount } = props;
  return (
    <div className={style.likeBookmarkWrapper}>
      <div className={style.like}>
        {isliked ? (
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
        <div className={style.likeCount}>{likeCount}</div>
      </div>
      <div className={style.bookmark}>
        {isBookmarked ? (
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
  );
});
