"use client";

import { NotLoginHeader } from "@/components/organisms/NotLoginHeader";

/**
 * HomeTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const HomeTemplate = () => {
  return (
    <>
      {/* <header className={style.header}>
        <div>
          <p>タイトル</p>
        </div>
        <div className={style.inputContainer}>
          <input className={style.input} placeholder={"キーワード検索"} />
        </div>
        <div>
          <button className={`${style.button} ${style.buttonSignup}`}>
            新規登録
          </button>
          <button className={`${style.button} ${style.buttonSignin}`}>
            ログイン
          </button>
        </div>
      </header> */}
      <NotLoginHeader />
      <footer className={style.footer}>
        <div className={style.footerContainer}>
          <div className={style.footerHome}>
            <p>HOME</p>
          </div>
          <div className={style.footerPrivacyPolicy}>
            <p>プライバシーポリシー</p>
          </div>
          <div className={style.footerTermsOfUse}>
            <p>利用規約</p>
          </div>
        </div>
      </footer>
    </>
  );
};
