"use client";

/**
 * SignUpTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUpApi } from "@/apis/authApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type EventType } from "@/type/Event";
import crypto from "crypto-js";

import style from "./styles.module.css";

/**
 * SignUpTemplate
 * @returns {JSX.Element}
 */
export const SignUpTemplate = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  /* state定義 */
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  /* action定義 */
  /**
   * nameのインプット
   * @param {e}
   */
  const handleInputName: EventType["onChangeInput"] = useCallback((e) => {
    setName(e.target.value);
  }, []);
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputEmail: EventType["onChangeInput"] = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  /**
   * passwordのインプット
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
   * ログイン画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    router.push("/signin");
  }, [router]);

  /**
   * サインアップ処理
   */
  const handleSignUp = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Form Submitted with values:", {
        name,
        email,
        password,
      });
      const res = await signUpApi(name, email, password);
      if (res?.code >= 400) {
        alert(res.message);
        return;
      }
      if (res?.data?.user) {
        await signIn(res.data.user);
        const ecrypted = crypto.AES.encrypt(res.data.accessToken, "hogefuga");
        localStorage.setItem("access_token", ecrypted.toString());
        // localStorage.setItem('access_token', res.data.accessToken);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [name, email, password, router, signIn],
  );
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>新規登録</h1>
          <form onSubmit={handleSignUp}>
            <div className={style.inputWrapper}>
              <p className={style.inputLabel}>名前</p>
              <InputForm
                value={name}
                onChange={handleInputName}
                placeholder={"山田太郎"}
                additionalStyle={{ width: "100%" }}
              />
            </div>
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
                  src={isPasswordVisible ? "/eye-closed.svg" : "/eye-open.svg"} // 目のアイコンを変更
                  alt={isPasswordVisible ? "eyeClosed" : "eyeOpen"}
                  className={style.eye}
                  width={15}
                  height={15}
                />
                <p className={style.passwordToggleText}>
                  {isPasswordVisible ? "非表示にする" : "表示する"}
                </p>
              </div>
            </div>
            <div className={style.buttonWrapper}>
              <BaseButton
                type={"submit"}
                color={"primary"}
                size={"medium"}
                text={"新規登録"}
                additionalStyle={{ width: "100%" }}
              />
            </div>
          </form>
          <div className={style.authLinkWrapper}>
            <p className={style.authHelperText}>アカウントをお持ちの方</p>
            <p className={style.authLink} onClick={navigateToSignIn}>
              ログイン
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
