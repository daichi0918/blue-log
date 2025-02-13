"use client";

import { ExecFileOptionsWithStringEncoding } from "child_process";
import type { FC } from "react";
import { memo } from "react";
import Image from "next/image";
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
  const randomColor = useRandomColor();
  const { userName, image, createdAt } = props;
  return (
    <div className={style.articleInfo}>
      <div className={style.userImg}>
        {image ? (
          <Image src={image} alt={userName} />
        ) : (
          <span
            style={{ background: randomColor ?? "#FFD700" }}
            className={style.noUserImg}
          >
            {userName.charAt(0)}
          </span>
        )}
      </div>
      <div className={style.nameDateWrapper}>
        <p className={style.userName}>{userName}</p>
        <p className={style.date}>{formatDate(String(createdAt))}</p>
      </div>
    </div>
  );
});
