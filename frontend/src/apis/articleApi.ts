import type { IErrorResponse, ResponseType } from "@/apis/config";
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
    const res: ResponseType<Array<ArticleCardType>> = {
      code: 200,
      data,
    };
    return res;
  } catch (err) {
    const res: ResponseType = {
      code: 500,
      message: "",
    };
    if (isAxiosError(err)) {
      const axiosError = err as IErrorResponse;
      console.log("axiosError");
      console.log(axiosError);
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};
