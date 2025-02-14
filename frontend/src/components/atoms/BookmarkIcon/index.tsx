import { memo } from "react";
import Image from "next/image";

import style from "./styles.module.css";

/**
 * LikeIcon
 *
 * @package atoms
 */

type BookmarkIconProps = {
  isbookmarked: boolean;
  width: number;
  height: number;
};

/**
 * BookmarkIcon
 * @returns {JSX.Element}
 */
export const BookmarkIcon = memo((props: BookmarkIconProps) => {
  const { isbookmarked, width, height } = props;
  return (
    <>
      {isbookmarked ? (
        <Image
          src="/bookmarked.svg"
          alt={"Bookmarked"}
          width={width}
          height={height}
          className={style.bookmark}
        />
      ) : (
        <Image
          src="/notBookmarked.svg"
          alt={"Not Bookmarked"}
          width={width}
          height={height}
          className={style.bookmark}
        />
      )}
    </>
  );
});
