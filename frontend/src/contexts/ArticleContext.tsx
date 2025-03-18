"use client";

/**
 * ArticleContext
 *
 * @package contexts
 */
import type { ReactNode } from "react";
import { createContext } from "react";
import { useArticle } from "@/hooks/UseArticle";
import { type EventType } from "@/type/Event";

type Props = {
  children: ReactNode;
};

type ContextInterface = {
  inputArticleSearch: string;
  handleInputSearch: EventType["onChangeInput"];
};

export const ArticleContext = createContext({} as ContextInterface);

/**
 * ArticleProvider
 * @param children
 * @returns
 */
export const ArticleProvider = ({ children }: Props) => {
  const { inputArticleSearch, handleInputSearch } = useArticle();
  return (
    <ArticleContext.Provider value={{ inputArticleSearch, handleInputSearch }}>
      {children}
    </ArticleContext.Provider>
  );
};
