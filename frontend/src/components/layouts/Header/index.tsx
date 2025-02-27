"use client";

/**
 * Header
 *
 * @package layouts
 */
import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { UserImage } from "@/components/atoms/UserImage";
import { type EventType } from "@/type/Event";
import { type UserType } from "@/type/User";

import { HeaderArea } from "../HeaderArea";
import style from "./styles.module.css";

type HeaderProps = {
  user: UserType | undefined;
  isAuth: boolean;
  searchInputValue: string;
  handleInputSearch: EventType["onChangeInput"];
};

/**
 * Header
 * @returns {JSX.Element}
 */
export const Header = memo((props: HeaderProps) => {
  const { isAuth, user, searchInputValue, handleInputSearch } = props;
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
    void router.push("/signin");
  }, [router]);

  /**
   * Home画面への遷移
   */
  const navigateToHome = useCallback(() => {
    void router.push("/");
  }, [router]);
  return (
    <HeaderArea>
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
        {isAuth && user ? (
          <>
            <UserImage image={user?.image} userName={user?.name} />
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
    </HeaderArea>
  );
});
