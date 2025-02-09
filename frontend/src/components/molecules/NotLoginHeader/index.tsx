"use client";

/**
 * NotLoginHeader
 *
 * @package molecules
 */
import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

type NotLoginHeaderProps = {
  searchInputValue: string;
  handleInputSearch: EventType["onChangeInput"];
};

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const NotLoginHeader = memo((props: NotLoginHeaderProps) => {
  const { searchInputValue, handleInputSearch } = props;
  const router = useRouter();

  /**
   * 新規登録画面への遷移
   */
  const navigateToSignUp = useCallback(() => {
    void router.push("/signup");
  }, [router]);

  /**
   * 新規登録画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    void router.push("/signup");
  }, [router]);
  return (
    <header className={style.header}>
      <div>
        <p className={style.title}>タイトル</p>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.input}
          placeholder={"キーワード検索"}
          value={searchInputValue}
          onChange={handleInputSearch}
        />
      </div>
      <div>
        <BaseButton
          color={"primary"}
          size={"medium"}
          text={"新規登録"}
          additionalStyle={{ marginRight: "15px" }}
          onClick={navigateToSignUp}
        />
        <BaseButton
          color={"secondary"}
          size={"medium"}
          text={"ログイン"}
          onClick={navigateToSignIn}
        />
      </div>
    </header>
  );
});
