import { memo } from "react";

import style from "./styles.module.css";

/**
 * Tags
 *
 * @package templates
 */

type TagsProps = {
  contents: Array<string>;
};
/**
 * Tags
 * @returns {JSX.Element}
 */
export const Tags = memo((props: TagsProps) => {
  const { contents } = props;

  return (
    <div className={style.articleTagsAll}>
      {contents.length > 0 &&
        contents.map((tag, index) => (
          <div key={`tag_${index}`} className={style.articleTag}>
            #{tag}
          </div>
        ))}
    </div>
  );
});
