import { memo } from "react";
import Image from "next/image";
import { useRandomColor } from "@/utils/getRandomColor";

import style from "./styles.module.css";

/**
 * UserImage
 *
 * @package atoms
 */

type UserImageProps = {
  image: string | null | undefined;
  userName: string;
};

/**
 * UserImage
 * @returns {JSX.Element}
 */
export const UserImage = memo((props: UserImageProps) => {
  const randomColor = useRandomColor();
  const { image, userName } = props;
  return (
    <div className={style.userIcon}>
      {image ? (
        <Image
          src={image}
          alt={userName}
          className={style.userImg}
          width={"32"}
          height={"32"}
        />
      ) : (
        <span
          style={{ background: randomColor ?? "#FFD700" }}
          className={style.noUserImg}
        >
          {userName.charAt(0)}
        </span>
      )}
    </div>
  );
});
