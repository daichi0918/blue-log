/**
 * PageContainer
 *
 * @package layouts
 */
import type { ReactNode } from "react";
import { memo } from "react";

import style from "./styles.module.css";

type Props = {
  children: ReactNode;
};

/**
 * PageContainer
 * @returns {JSX.Element}
 */
export const PageContainer = memo(({ children }: Props) => {
  return <div className={style.pageContainer}>{children}</div>;
});
