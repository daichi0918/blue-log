import type { ReactNode } from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";

import style from "./styles.module.css";

type ModalProps = {
  onClose: () => void;
};

export const Modal = ({ onClose }: ModalProps) => {
  const router = useRouter();

  /**
   * 新規登録画面への遷移
   */
  const navigateToSignUp = useCallback(() => {
    void router.push("/signup");
  }, [router]);

  /**
   * ログイン画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    void router.push("/signin");
  }, [router]);
  return ReactDOM.createPortal(
    <div className={style.overlay} data-modal>
      <div className={style.modal}>
        <section className={`${style.section} ${style.contentTop}`}>
          <h3 className={style.title}>ログインして続ける</h3>
          <Image
            alt={"closeIcon"}
            src={"/closeIcon.svg"}
            width={24}
            height={24}
            onClick={onClose}
          />
        </section>
        <section className={style.section}></section>
        <section className={style.section}></section>
      </div>
    </div>,
    document.body,
  );
};
