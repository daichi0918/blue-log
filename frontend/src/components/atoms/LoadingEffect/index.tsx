import style from "./styles.module.css";

/**
 * LoadingEffect
 *
 * @package atoms
 */

/**
 * LoadingEffect
 * 参考記事: https://digipress.info/tech/css-spinner-animation-demo/
 * @returns {JSX.Element}
 */
export const LoadingEffect = () => {
  return (
    <div className={style.box}>
      <div className={`${style.spinner} ${style.type1}`}>
        <span>Loading...</span>
      </div>
    </div>
  );
};
