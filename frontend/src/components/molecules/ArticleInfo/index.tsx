"use client";

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
  color: string;
  createdAt: string;
};

export const ArticleInfo = memo((props: ArticleInfoProps) => {
  const { userId, userName, image, color, createdAt } = props;
  return (
    <UserLink userId={userId}>
      <div className={style.articleInfo}>
        <UserImage image={image} userName={userName} color={color} />
        <div className={style.nameDateWrapper}>
          <p className={style.userName}>{userName}</p>
          <p className={style.date}>{formatDate(String(createdAt))}</p>
        </div>
      </div>
    </UserLink>
  );
});
