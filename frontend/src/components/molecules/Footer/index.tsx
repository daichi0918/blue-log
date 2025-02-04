/**
 * Footer
 *
 * @package organisms
 */

import style from "./styles.module.css";

/**
 * Footer
 * @returns {JSX.Element}
 */
export const Footer = () => {
  return (
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
  );
};
