"use client";

/**
 * SignUpTemplate
 *
 * @package templates
 */
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
 * SignUpTemplate
 * @returns {JSX.Element}
 */
export const SignUpTemplate = () => {
  const router = useRouter();
  /* state定義 */
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
   * ログイン画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    router.push("/signin");
  }, [router]);
  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>新規登録</h1>
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
                text={"新規登録"}
                additionalStyle={{ width: "100%" }}
              />
            </div>
            <div className={style.authLinkWrapper}>
              <p className={style.authHelperText}>アカウントをお持ちの方</p>
              <p className={style.authLink} onClick={navigateToSignIn}>
                ログイン
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
