import Link from "next/link";
import { Modal } from "@/components/molecules/Modal";

import style from "./styles.module.css";

/**
 * Modal
 *
 * @package molecules
 */

/**
 * Modal
 * @returns {JSX.Element}
 */

export const LoginModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose} title={"ログインして続ける"}>
      <section className={style.section}>
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
      </section>
    </Modal>
  );
};
