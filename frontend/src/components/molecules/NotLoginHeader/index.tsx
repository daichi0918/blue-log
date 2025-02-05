/**
 * NotLoginHeader
 *
 * @package molecules
 */

import { memo } from "react";
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
        />
        <BaseButton color={"secondary"} size={"medium"} text={"ログイン"} />
      </div>
    </header>
  );
});
