/**
 * ArticleContentWrapper
 *
 * @package layouts
 */

import style from "./styles.module.css";

type ArticleContentWrapperProps = {
  children: React.ReactNode;
};

/**
 * ArticleContentWrapper
 * @returns {JSX.Element}
 */
export const ArticleContentWrapper = ({
  children,
}: ArticleContentWrapperProps) => {
  return <div className={style.contentSection}>{children}</div>;
};
