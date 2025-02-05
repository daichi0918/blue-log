import { globalAxios, isAxiosError } from "@/apis/config";
import { type ArticleCardType } from "@/type/ArticleCard";
import { type AxiosResponse } from "axios";

/**
 * 記事一覧リストのAPI
 */
export const fetchArticleListApi = async () => {
  try {
    const { data }: AxiosResponse<Array<ArticleCardType>> =
      await globalAxios.get("/articles");
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};
console.log("sss");
