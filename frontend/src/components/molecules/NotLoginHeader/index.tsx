/**
 * NotLoginHeader
 *
 * @package molecules
 */

import { memo } from "react";
import { BaseButton } from "@/components/atoms/BaseButton";
import { Button } from "@/stories/Button";

import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const NotLoginHeader = memo(() => {
  return (
    <header className={style.header}>
      <div>
        <p className={style.title}>タイトル</p>
      </div>
      <div className={style.inputContainer}>
        <input className={style.input} placeholder={"キーワード検索"} />
      </div>
      <div>
        <BaseButton
          color={"primary"}
          size={"medium"}
          text={"新規登録"}
          additionalStyle={{ marginRight: "15px" }}
        />
        <BaseButton color={"secondary"} size={"medium"} text={"ログイン"} />
      </div>
    </header>
  );
});
