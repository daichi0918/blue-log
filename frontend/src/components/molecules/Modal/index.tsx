import Image from "next/image";
import ReactDOM from "react-dom";

import style from "./styles.module.css";

/**
 * Modal
 *
 * @package molecules
 */

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * Modal
 * @returns {JSX.Element}
 */
export const Modal = (props: ModalProps) => {
  const { title, onClose, children } = props;
  return ReactDOM.createPortal(
    <div className={style.overlay} data-modal>
      <div className={style.modal}>
        <section className={`${style.section} ${style.contentTop}`}>
          <h3 className={style.title}>{title}</h3>
          <Image
            alt={"closeIcon"}
            src={"/closeIcon.svg"}
            width={24}
            height={24}
            onClick={onClose}
          />
        </section>
        {/* <section className={style.section}>
          <p className={style.text}>
            「いいね」や「保存」機能を利用するには、ログインが必要です。
          </p>
        </section>
        <section className={`${style.section} ${style.navigationTextWrapper}`}>
          <div className={style.navigationText}>
            <span>アカウントをお持ちの方</span>
            <Link className={style.navigationLink} href={"/signup"}>
              新規登録
            </Link>
          </div>
          <div className={style.navigationText}>
            <span>アカウントをお持ちでない方</span>
            <Link className={style.navigationLink} href={"/signin"}>
              ログイン
            </Link>
          </div>
        </section> */}
        {children}
      </div>
    </div>,
    document.body,
  );
};
