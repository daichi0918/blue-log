"use client";

/**
 * ArticleContext
 *
 * @package contexts
 */
import type { ReactNode } from "react";
import { createContext, FC, useContext, useState } from "react";
import { type ArticleCardType } from "@/type/ArticleCard";

type Props = {
  children: ReactNode;
};

type ContextInterface = {
  articleList: Array<ArticleCardType>;
};

/**
 * TodoContext
 */
export const ArticleContext = createContext({} as ContextInterface);
/**
 * ArticleProvider
 *
 * @param children
 */
// export const ArticleProvider= ({ children }: Props) => {
//   const [articleList, setArticleList] = useState<Array<ArticleCardType>>([]);

//   return (
//     <ArticleContext.Provider value={{articleList, setArticleList}}>{children}</ArticleContext.Provider>
//   );
// };
