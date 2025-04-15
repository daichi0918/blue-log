import { type ReactNode } from "react";
import Link from "next/link";

import style from "./styles.module.css";

/**
 * UserImage
 *
 * @package atoms
 */

type UserLinkProps = {
  userId: number;
  children: ReactNode;
};

/**
 * UserLink
 * @returns {JSX.Element}
 */
export const UserLink = ({ userId, children }: UserLinkProps) => {
  return (
    <Link href={`/user/${userId}`} className={style.link}>
      {children}
    </Link>
  );
};
