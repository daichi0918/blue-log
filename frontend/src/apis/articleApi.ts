import type { ResponseType } from "@/apis/config";
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
 * ユーザーIDで記事取得のAPI
 * @param {string} userId
 * @returns {ResponseType<Array<ArticleCardType>>}
 */
export const fetchArticlesByUserId = async (userId: string) => {
  try {
    const { data }: AxiosResponse<Array<ArticleCardType>> =
      await globalAxios.get(`/articles/user/${userId}`);
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
 * 対象ユーザーがいいねした記事を取得
 * @param {string} userId
 * @returns {ResponseType<Array<ArticleCardType>>}
 */
export const fetchLikedArticlesByUserIdAPI = async (userId: string) => {
  try {
    const { data }: AxiosResponse<Array<ArticleCardType>> =
      await globalAxios.get(`/articles/user/${userId}/like`);
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
 * 対象ユーザーが保存した記事を取得
 * @param {string} userId
 * @returns {ResponseType<Array<ArticleCardType>>}
 */
export const fetchBookmarkedArticlesByUserIdAPI = async (userId: string) => {
  try {
    const { data }: AxiosResponse<Array<ArticleCardType>> =
      await globalAxios.get(`/articles/user/${userId}/bookmark`);
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
 * @param {string} id
 * @returns {ResponseType<ArticleType>}
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

/**
 * 記事作成のAPI
 * @param {string} title
 * @param {string} text
 * @param {Array<string>} tags
 * @returns
 */
export const createArticleApi = async (
  title: string,
  text: string,
  tags: Array<string>,
) => {
  try {
    const { data }: AxiosResponse<ArticleType> = await globalAxios.post(
      "articles",
      {
        title,
        text,
        tags,
      },
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
      // const axiosError = err as IErrorResponse;
      // res.code = axiosError.response.status;
      // res.message = axiosError.response.data.message;
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
