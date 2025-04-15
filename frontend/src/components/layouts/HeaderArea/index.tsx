/**
 * HeaderArea
 *
 * @package layouts
 */
import type { ReactNode } from "react";
import { memo, useCallback } from "react";
import Image from "next/image";
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
        <Image
          alt={"headerIcon"}
          src={"/HeaderIcon.svg"}
          width={100}
          height={75}
        />
      </div>
      {children}
    </header>
  );
});
