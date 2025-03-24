import { memo } from "react";
import Image from "next/image";
import { animateScroll as scroll } from "react-scroll";

import style from "./styles.module.css";

/**
 * scrollTopIcon
 *
 * @package atoms
 */

/**
 * scrollTopIcon
 * @returns {JSX.Element}
 */
export const ScrollTopIcon = memo(() => {
  const handleScroll = () => {
    (scroll as { scrollToTop: () => void }).scrollToTop();
  };
  return (
    <Image
      src={"/scrollTopIcon.svg"}
      alt={"scrollTop"}
      width={60}
      height={60}
      className={style.icon}
      onClick={handleScroll}
    />
  );
});
