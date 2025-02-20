import type { ReactNode } from "react";
import { memo } from "react";

import styles from "./styles.module.css";

type Props = {
  children: ReactNode;
};

export const PageContainer = memo(({ children }: Props) => {
  return <div className={styles.pageContainer}>{children}</div>;
});
