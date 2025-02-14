"use client";

import type { FC } from "react";
import { memo } from "react";
import Image from "next/image";
import { UserImage } from "@/components/atoms/UserImage";
import { formatDate } from "@/utils/getFormatDate";
import { useRandomColor } from "@/utils/getRandomColor";

import style from "./styles.module.css";

/**
 * ArticleInfo
 *
 * @package molecules
 */

type ArticleInfoProps = {
  userName: string;
  image: string | null;
  createdAt: string;
};

export const ArticleInfo: FC<ArticleInfoProps> = memo((props) => {
  const { userName, image, createdAt } = props;
  return (
    <div className={style.articleInfo}>
      <UserImage image={image} userName={userName} />
      <div className={style.nameDateWrapper}>
        <p className={style.userName}>{userName}</p>
        <p className={style.date}>{formatDate(String(createdAt))}</p>
      </div>
    </div>
  );
});
