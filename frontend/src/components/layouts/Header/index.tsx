"use client";

/**
 * NotLoginHeader
 *
 * @package molecules
 */
import { memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { type EventType } from "@/type/Event";
import { type UserType } from "@/type/User";
import { useRandomColor } from "@/utils/getRandomColor";

import style from "./styles.module.css";

type NotLoginHeaderProps = {
  user: UserType | undefined;
  isAuth: boolean;
  searchInputValue: string;
  handleInputSearch: EventType["onChangeInput"];
};

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const Header = memo((props: NotLoginHeaderProps) => {
  const { isAuth, user, searchInputValue, handleInputSearch } = props;
  const router = useRouter();
  const randomColor = useRandomColor();

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
        <p className={style.title}>Blue Log</p>
      </div>
      <div className={style.inputContainer}>
        <InputForm
          placeholder={"キーワード検索"}
          value={searchInputValue}
          onChange={handleInputSearch}
          additionalStyle={{
            minWidth: "400px",
            minHeight: "40px",
            paddingLeft: "40px",
          }}
        />
      </div>
      <div className={style.authSection}>
        {isAuth ? (
          <>
            <div className={style.userImg}>
              {user?.image ? (
                // <img src={user?.image} alt={user?.name} />
                <Image src={user?.image} alt={user?.name} />
              ) : (
                <span
                  style={{ background: randomColor ?? "#ddd" }}
                  className={style.noUserImg}
                >
                  {user?.name.charAt(0)}
                </span>
              )}
            </div>
            <BaseButton
              color={"primary"}
              size={"medium"}
              text={"投稿"}
              additionalStyle={{ marginLeft: "25px" }}
              onClick={navigateToSignUp}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
});
