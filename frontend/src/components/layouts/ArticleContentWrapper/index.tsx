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
  return <main className={style.contentSection}>{children}</main>;
};
