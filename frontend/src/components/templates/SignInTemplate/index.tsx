"use client";

/**
 * SignInTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchArticleListApi } from "@/apis/articleApi";
import { signInApi } from "@/apis/authApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";
import crypto from "crypto-js";

import style from "./styles.module.css";

/**
 * SignInTemplate
 * @returns {JSX.Element}
 */
export const SignInTemplate = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  /* state定義 */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  /* action定義 */
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputEmail: EventType["onChangeInput"] = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputPassword: EventType["onChangeInput"] = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  /**
   * パスワードの表示切り替え
   */
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);
  /**
   * 新規登録画面への遷移
   */
  const navigateToSignUp = useCallback(() => {
    router.push("/signup");
  }, [router]);
  /**
   * ログイン
   */
  const handleLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const res = await signInApi(email, password);
      if (res?.code >= 400) {
        alert(res.message);
        return;
      }
      if (res?.data?.user) {
        void signIn(res.data.user);
        console.log(res.data);
        // 暗号化
        const ecrypted = crypto.AES.encrypt(res.data.accessToken, "hogefuga");
        localStorage.setItem("access_token", ecrypted.toString());
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [email, password],
  );

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>ログイン</h1>
          <form onSubmit={handleLogin}>
            <div className={style.inputWrapper}>
              <p className={style.inputLabel}>メールアドレス</p>
              <InputForm
                value={email}
                onChange={handleInputEmail}
                placeholder={"abcd.1234@mail.com"}
                additionalStyle={{ width: "100%" }}
              />
            </div>
            <div className={style.inputWrapper}>
              <div className={style.inputLabelWrapper}>
                <p className={style.inputLabel}>パスワード</p>
                <p className={style.inputLabelHelper}>
                  （英大小・数字・記号を1文字以上含む）
                </p>
              </div>
              <InputForm
                placeholder={"TestUser#1"}
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={handleInputPassword}
                additionalStyle={{ width: "100%" }}
              />
              <div
                className={style.passwordToggle}
                onClick={togglePasswordVisibility}
              >
                <Image
                  // TODO: eye-closed.svgの追加
                  src={isPasswordVisible ? "/eye-closed.svg" : "/eye-open.svg"}
                  alt={isPasswordVisible ? "eyeClosed" : "eyeOpen"}
                  className={style.eye}
                  width={15}
                  height={15}
                />
                <p className={style.passwordToggleText}>
                  {isPasswordVisible ? "非表示にする" : "表示する"}
                </p>
              </div>
              <div className={style.buttonWrapper}>
                <BaseButton
                  type={"submit"}
                  color={"primary"}
                  size={"medium"}
                  text={"ログイン"}
                  additionalStyle={{ width: "100%" }}
                />
              </div>
            </div>
          </form>
          <div className={style.authLinkWrapper}>
            <p className={style.authHelperText}>アカウントをお持ちでない方</p>
            <p className={style.authLink} onClick={navigateToSignUp}>
              新規登録
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
