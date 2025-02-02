/**
 * NotLoginHeader
 *
 * @package organisms
 */

import style from "./styles.module.css";

/**
 * HomeTemplate
 * @returns {JSX.Element}
 */
export const NotLoginHeader = () => {
  return (
    <header className={style.header}>
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
    </header>
  );
};
