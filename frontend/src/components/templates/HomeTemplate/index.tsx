"use client";

import style from "./styles.module.css";

export const HomeTemplate = () => {
  return (
    <>
      <header className={style.header}>
        <div>
          <p>タイトル</p>
        </div>
        <div>
          <input />
        </div>
        <div>
          <button className={`${style.button} ${style.button_signup}`}>
            新規登録
          </button>
          <button className={`${style.button} ${style.button_signin}`}>
            ログイン
          </button>
        </div>
      </header>
    </>
  );
};
