"use client";

/**
 * MarkdonwPreview
 *
 * @package molecules
 */
import { memo } from "react";
import ReactMarkdown from "react-markdown";

import style from "./styles.module.css";

type MarkdonwPreviewProps = {
  text: string;
};

/**
 * MarkdownPreview
 *
 * @returns {JSX.Element}
 */

export const MarkdonwPreview = memo((props: MarkdonwPreviewProps) => {
  const { text } = props;
  return <ReactMarkdown className={style.markdown}>{text}</ReactMarkdown>;
});
