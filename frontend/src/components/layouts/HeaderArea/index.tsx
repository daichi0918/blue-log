/**
 * HeaderArea
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
 * HeaderArea
 * @returns {JSX.Element}
 */
export const HeaderArea = memo(({ children }: Props) => {
  return <header className={style.header}>{children}</header>;
});
