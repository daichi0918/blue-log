"use client";

/**
 * SignInTemplate
 *
 * @package templates
 */
import Image from "next/image";
import Link from "next/link";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";

import style from "./styles.module.css";
import { useSignInTemplate } from "./useSignInTemplate";

/**
 * SignInTemplate
 * @returns {JSX.Element}
 */
export const SignInTemplate = () => {
  // SignInTemplateのカスタムフックを使用
  const {
    email,
    password,
    isPasswordVisible,
    handleInputEmail,
    handleInputPassword,
    togglePasswordVisibility,
    navigateToSignUp,
    handleLogin,
  } = useSignInTemplate();

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
          <div className={style.homeLink}>
            <Link href={"/"}>HOME</Link>
          </div>
        </div>
      </div>
    </>
  );
};
