"use client";

/**
 * Header
 *
 * @package layouts
 */
import { memo, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { UserImage } from "@/components/atoms/UserImage";
import { NAVIGATION_LIST } from "@/constants/navigation";
import { ArticleContext } from "@/contexts/ArticleContext";
import { AuthContext } from "@/contexts/AuthContext";
import { type EventType } from "@/type/Event";

import { HeaderArea } from "../HeaderArea";
import style from "./styles.module.css";

/**
 * Header
 * @returns {JSX.Element}
 */
export const Header = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // const menuRef = useRef<HTMLUListElement | null>(null);
  const { isAuth, user, signOut } = useContext(AuthContext);
  const { inputArticleSearch, handleInputSearch } = useContext(ArticleContext);
  /**
   * 新規登録画面への遷移
   */
  const navigateToSignUp = useCallback(() => {
    void router.push("/signup");
  }, [router]);

  /**
   * ログイン画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    void router.push("/signin");
  }, [router]);
  /**
   * 編集・削除トグル制御
   */
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const menuElement = document.getElementById("toggleMenu");
      const userIcon = document.getElementById("userIcon");
      if (
        isOpen &&
        menuElement &&
        userIcon && // メニューが存在しているか
        event.target instanceof Node && // 型チェック
        !menuElement.contains(event.target) && // メニュー外をクリックした場合
        !userIcon.contains(event.target)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  /**
   * Home画面遷移
   */
  const handleEnterSearch: EventType["onkeypress"] = useCallback(
    (e) => {
      if (e.key === "Enter" && inputArticleSearch.trim() !== "")
        router.push("/");
    },
    [inputArticleSearch, router],
  );

  useEffect(() => {
    // イベントリスナー追加
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // クリーンアップ
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  /**
   * マイページ画面遷移
   */
  const navigateToMyPage = useCallback(() => {
    void router.push(`/user/${user?.id}`);
  }, [router, user?.id]);
  /**
   * ログアウト
   */
  const handleSignOut = useCallback(async () => {
    localStorage.removeItem("access_token");
    void signOut();
    router.push(NAVIGATION_LIST.LOGIN);
  }, [router, signOut]);

  /**
   * 新規投稿画面遷移
   */
  const navigateToArticleNew = useCallback(() => {
    void router.push(`/article/new`);
  }, [router]);

  return (
    <HeaderArea>
      <div className={style.inputContainer}>
        <InputForm
          placeholder={"キーワード検索"}
          value={inputArticleSearch}
          onChange={handleInputSearch}
          onKeyDown={handleEnterSearch}
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
            <div
              id={"userIcon"}
              className={style.actionMenuWrapper}
              onClick={toggleMenu}
            >
              <UserImage
                image={user?.image}
                userName={user?.name}
                color={user?.backgroundColor}
              />
              <div className={style.actionMenu}>
                <ul
                  id={"toggleMenu"}
                  className={`${style.menuList} ${isOpen ? style.show : ""}`}
                >
                  <li className={style.menuItem} onClick={navigateToMyPage}>
                    <Image
                      src="/mypage.svg"
                      alt="mypage"
                      width={16}
                      height={16}
                    />
                    <p>マイページ</p>
                  </li>
                  <li className={style.menuItem} onClick={handleSignOut}>
                    <Image
                      src="/logout.svg"
                      alt="delete"
                      width={16}
                      height={16}
                      className={style.logoutIcon}
                    />
                    <p>ログアウト</p>
                  </li>
                </ul>
              </div>
            </div>

            <BaseButton
              color={"primary"}
              size={"medium"}
              text={"投稿"}
              additionalStyle={{ marginLeft: "25px" }}
              onClick={navigateToArticleNew}
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
