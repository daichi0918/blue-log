"use client";

import { memo } from "react";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";

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
  const { isliked, isbookmarked, likeCount } = props;
  return (
    <div className={style.likeBookmarkWrapper}>
      <div className={style.like}>
        <LikeIcon isliked={isliked} width={22} height={22} />
        <div className={style.likeCount}>{likeCount}</div>
      </div>
      <div className={style.bookmark}>
        <BookmarkIcon isbookmarked={isbookmarked} width={18} height={22} />
      </div>
    </div>
  );
});
