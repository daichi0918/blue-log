import type { ReactNode } from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";

import style from "./styles.module.css";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
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
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className={style.closeButton}>
          閉じる
        </button>
      </div>
    </div>,
    document.body,
  );
};
