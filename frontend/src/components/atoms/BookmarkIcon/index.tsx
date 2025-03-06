import { memo } from "react";
import Image from "next/image";

import style from "./styles.module.css";

/**
 * BookmarkIcon
 *
 * @package atoms
 */

type BookmarkIconProps = {
  isbookmarked: boolean;
  width: number;
  height: number;
  onClick?: (event: React.MouseEvent) => void;
};

/**
 * BookmarkIcon
 * @returns {JSX.Element}
 */
export const BookmarkIcon = memo((props: BookmarkIconProps) => {
  const { isbookmarked, width, height, onClick } = props;
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // ← ここでイベントの伝播を止める
    onClick?.(event);
  };
  return (
    <>
      {isbookmarked ? (
        <Image
          src="/bookmarked.svg"
          alt={"Bookmarked"}
          width={width}
          height={height}
          className={style.bookmark}
          onClick={handleClick}
        />
      ) : (
        <Image
          src="/notBookmarked.svg"
          alt={"Not Bookmarked"}
          width={width}
          height={height}
          className={style.bookmark}
          onClick={handleClick}
        />
      )}
    </>
  );
});
