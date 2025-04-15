"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { PageContainer } from "@/components/layouts/PageContainer";

/**
 * notFoundTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * notFoundTemplate
 * @returns {JSX.Element}
 */
export const NotFoundTemplate = () => {
  const router = useRouter();

  const navigateToTop = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <PageContainer>
        <main className={style.main}>
          <Image src={"/404.svg"} alt={"404"} width={107} height={60} />
          <h1 className={style.title}>
            お探しのページは見つかりませんでした。
          </h1>
          <p className={style.text}>
            あなたがアクセスしたページは削除されたかURLが変更されているため、表示することができません。
          </p>
          <BaseButton
            size={"medium"}
            text={"トップへ戻る"}
            color={"secondary"}
            onClick={navigateToTop}
          />
        </main>
      </PageContainer>
    </>
  );
};
