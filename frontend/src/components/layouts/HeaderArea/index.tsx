/**
 * HeaderArea
 *
 * @package layouts
 */
import type { ReactNode } from "react";
import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

import style from "./styles.module.css";

type Props = {
  children: ReactNode;
};

/**
 * HeaderArea
 * @returns {JSX.Element}
 */
export const HeaderArea = memo(({ children }: Props) => {
  const router = useRouter();
  /**
   * Home画面への遷移
   */
  const navigateToHome = useCallback(() => {
    void router.push("/");
  }, [router]);
  return (
    <header className={style.header}>
      <div className={style.titleWrapper} onClick={navigateToHome}>
        <p className={style.title}>Blue Log</p>
      </div>
      {children}
    </header>
  );
});
