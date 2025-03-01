import { type ReactNode } from "react";
import ReactDOM from "react-dom";

import style from "./styles.module.css";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
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
