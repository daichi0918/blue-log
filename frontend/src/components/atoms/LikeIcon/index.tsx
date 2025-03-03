import { memo } from "react";
import Image from "next/image";

import style from "./styles.module.css";

/**
 * LikeIcon
 *
 * @package atoms
 */

type LikeIconProps = {
  isliked: boolean;
  width: number;
  height: number;
  onClick: (event: React.MouseEvent) => void;
};

/**
 * LikeIcon
 * @returns {JSX.Element}
 */
export const LikeIcon = memo((props: LikeIconProps) => {
  const { isliked, width, height, onClick } = props;

  return (
    <>
      {isliked ? (
        <Image
          src="/liked.svg"
          alt={"Liked"}
          width={width}
          height={height}
          className={style.like}
          onClick={onClick}
        />
      ) : (
        <Image
          src="/notLiked.svg"
          alt={"Not Liked"}
          width={width}
          height={height}
          className={style.like}
          onClick={onClick}
        />
      )}
    </>
  );
});
