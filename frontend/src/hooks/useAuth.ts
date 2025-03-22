"use client";

/**
 * useAuth
 *
 * @package hooks
 */
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authenticationApi } from "@/apis/authApi";
import { NAVIGATION_LIST } from "@/constants/navigation";
import { type UserType } from "@/type/User";

/**
 * useAuth
 * @returns
 */
export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  /**
   * グローバルの認証状態をログイン済にする (ログイン)
   */
  const signIn = useCallback(async (user: UserType) => {
    setUser(user);
    setIsAuth(true);
  }, []);

  /**
   * グローバルの認証状態を未ログインにする (ログアウト)
   */
  const signOut = useCallback(async () => {
    setUser(undefined);
    setIsAuth(false);
  }, []);

  // const convertPathToRegex = (path: string) => {
  //   // `:id` を `(\d+)` に置換して正規表現に変換
  //   const regexString = `^${path.replace(/:id/g, "(\\d+)").replace(/\//g, "\\/")}$`;
  //   return new RegExp(regexString);
  // };

  /**
   * 認証されていないと表示されないページの判定処理
   */
  const isProtectedPage = useCallback(() => {
    return (
      pathname === NAVIGATION_LIST.ARTICLENEW
      // ||
      // pathname === NAVIGATION_LIST.ARTICLEEDIT ||
      // pathname === NAVIGATION_LIST.SETTING
    );
  }, [pathname]);

  /**
   * 未ログインページ
   */
  const isPublicAuthPage = useCallback(() => {
    return (
      pathname === NAVIGATION_LIST.LOGIN || pathname === NAVIGATION_LIST.SIGNUP
    );
  }, [pathname]);

  /**
   * 認証ルーティング
   */
  const authRouting = useCallback(async () => {
    const res = await authenticationApi();

    if (res?.data?.user) {
      setUser(res?.data?.user);
      setIsAuth(true);
    }
    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!isAuth && isProtectedPage()) router.push(NAVIGATION_LIST.LOGIN);
    // // ログイン済で認証ページにいる場合、Todo一覧ページにリダイレクト
    if (isAuth && isPublicAuthPage()) router.push(NAVIGATION_LIST.TOP);
  }, [isProtectedPage, isPublicAuthPage, router, isAuth]);

  useEffect(() => {
    void authRouting();
  }, [authRouting]);

  return {
    user,
    isAuth,
    signIn,
    signOut,
  };
};
