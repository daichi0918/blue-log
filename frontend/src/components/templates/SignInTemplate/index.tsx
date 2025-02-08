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

  /* action定義 */

  return (
    <>
      <div className={style.container}>
        <div className={style.box}>
          <h1 className={style.title}>ログイン</h1>
          <div className={style.inputWrapper}>
            <p className={style.inputLabel}>メールアドレス</p>
            <input className={style.input} placeholder={"abcd.1234@mail.com"} />
          </div>
          <div className={style.inputWrapper}>
            <p className={style.inputLabel}>パスワード</p>
            <input className={style.input} placeholder={"TestUser#1"} />
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
          </div>
        </div>
      </div>
    </>
  );
};
