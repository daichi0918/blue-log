/**
 * Footer
 *
 * @package molecules
 */

import { memo } from "react";
import { useRouter } from "next/navigation";

import style from "./styles.module.css";

/**
 * Footer
 * @returns {JSX.Element}
 */
export const Footer = memo(() => {
  const router = useRouter();

  /* action定義 */

  /**
   * プライバシーポリシー遷移
   */
  const navigateToPrivacyPolicy = () => router.push("/privacy-policy");
  /**
   * 利用規約遷移
   */
  const navigateToTermsOfService = () => router.push("/terms-of-service");

  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className={style.footerHome}>
          <p>HOME</p>
        </div>
        <div
          className={style.footerPrivacyPolicy}
          onClick={navigateToPrivacyPolicy}
        >
          <p>プライバシーポリシー</p>
        </div>
        <div
          className={style.footerTermsOfUse}
          onClick={navigateToTermsOfService}
        >
          <p>利用規約</p>
        </div>
      </div>
    </footer>
  );
});
