"use client";

/**
 * SignInTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { fetchArticleListApi } from "@/apis/articleApi";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { Footer } from "@/components/molecules/Footer";
import { NotLoginHeader } from "@/components/molecules/NotLoginHeader";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type EventType } from "@/type/Event";

import style from "./styles.module.css";

/**
 * SignInTemplate
 * @returns {JSX.Element}
 */
export const SignInTemplate = () => {
  /* state定義 */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>ログイン</h1>
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
            <p className={style.inputLabel}>パスワード</p>
            <InputForm
              placeholder={"TestUser#1"}
              type={"password"}
              value={password}
              onChange={handleInputPassword}
              additionalStyle={{ width: "100%" }}
            />
            <div className={style.passwordToggle}>
              <Image
                src="/eye-open.svg"
                alt={"eyeOpen"}
                className={style.eye}
                width={15}
                height={15}
              />
              <p className={style.passwordToggleText}>表示する</p>
            </div>
            <div className={style.buttonWrapper}>
              <BaseButton
                color={"primary"}
                size={"medium"}
                text={"ログイン"}
                additionalStyle={{ width: "100%" }}
              />
            </div>
            <div className={style.authLinkWrapper}>
              <p className={style.authHelperText}>アカウントをお持ちでない方</p>
              <p className={style.authLink}>新規登録</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
