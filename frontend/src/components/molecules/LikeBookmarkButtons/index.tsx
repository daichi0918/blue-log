"use client";

import type { FC } from "react";
import { memo } from "react";
import { BookmarkIcon } from "@/components/atoms/BookmarkIcon";
import { LikeIcon } from "@/components/atoms/LikeIcon";

import style from "./styles.module.css";

/**
 * LikeBookarkButtonsProps
 *
 * @package molecules
 */

type LikeBookarkButtonsProps = {
  isliked: boolean;
  isbookmarked: boolean;
  likeCount: number;
};

export const LikeBookmarkButtons: FC<LikeBookarkButtonsProps> = memo(
  (props) => {
    const { isliked, isbookmarked, likeCount } = props;
    return (
      <div className={style.likeBookmarkWrapper}>
        <div className={style.like}>
          <LikeIcon isliked={isliked} width={20} height={24} />
          <div className={style.likeCount}>{likeCount}</div>
        </div>
        <div className={style.bookmark}>
          <BookmarkIcon isbookmarked={isbookmarked} width={20} height={24} />
        </div>
      </div>
    );
  },
);
