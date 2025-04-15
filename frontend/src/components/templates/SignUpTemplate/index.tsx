"use client";

/**
 * SignUpTemplate
 *
 * @package templates
 */
import Image from "next/image";
import Link from "next/link";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";

import style from "./styles.module.css";
import { useSignUpTemplate } from "./useSignUpTemplate";

/**
 * SignUpTemplate
 * @returns {JSX.Element}
 */
export const SignUpTemplate = () => {
  const {
    name,
    email,
    password,
    isPasswordVisible,
    handleInputName,
    handleInputEmail,
    handleInputPassword,
    togglePasswordVisibility,
    navigateToSignIn,
    handleSignUp,
  } = useSignUpTemplate();
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>新規登録</h1>
          <form onSubmit={handleSignUp}>
            <div className={style.inputWrapper}>
              <p className={style.inputLabel}>ユーザー名</p>
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
          <div className={style.homeLink}>
            <Link href={"/"}>HOME</Link>
          </div>
        </div>
      </div>
    </>
  );
};
