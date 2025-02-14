import type { IErrorResponse, ResponseType } from "@/apis/config";
import { globalAxios, isAxiosError } from "@/apis/config";
import { type ArticleType } from "@/type/Article";
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
      const res: ResponseType = { code: 500, message: "An error occurred" };
      if (isAxiosError(err)) {
        console.error("Axios Error:", err);
        if (err.response) {
          res.code = err.response.status;
          res.message =
            typeof err.message === "string" ? err.message : "Unknown error";
        } else {
          res.message = err.message;
        }
      }
      return res;
    }
    return res;
  }
};

/**
 * 記事取得のAPI
 */
export const fetchArticleAPI = async (id: string) => {
  try {
    const { data }: AxiosResponse<ArticleType> = await globalAxios.get(
      `/articles/${id}`,
    );
    const res: ResponseType<ArticleType> = {
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
      const res: ResponseType = { code: 500, message: "An error occurred" };
      if (isAxiosError(err)) {
        console.error("Axios Error:", err);
        if (err.response) {
          res.code = err.response.status;
          res.message =
            typeof err.message === "string" ? err.message : "Unknown error";
        } else {
          res.message = err.message;
        }
      }
      return res;
    }
    return res;
  }
};
