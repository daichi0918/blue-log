"use client";

import type { FC } from "react";
import { memo } from "react";
import { UserImage } from "@/components/atoms/UserImage";
import { UserLink } from "@/components/atoms/UserLink";
import { formatDate } from "@/utils/getFormatDate";

import style from "./styles.module.css";

/**
 * ArticleInfo
 *
 * @package molecules
 */

type ArticleInfoProps = {
  userId: number;
  userName: string;
  image: string | null;
  createdAt: string;
};

export const ArticleInfo: FC<ArticleInfoProps> = memo((props) => {
  const { userId, userName, image, createdAt } = props;
  return (
    <UserLink userId={userId}>
      <div className={style.articleInfo}>
        <UserImage image={image} userName={userName} />
        <div className={style.nameDateWrapper}>
          <p className={style.userName}>{userName}</p>
          <p className={style.date}>{formatDate(String(createdAt))}</p>
        </div>
      </div>
    </UserLink>
  );
});
