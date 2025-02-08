import type { IErrorResponse, ResponseType } from "@/apis/config";
import globalAxios, { isAxiosError } from "@/apis/config";
import { type AuthResponseType } from "@/type/User";
import { type AxiosResponse } from "axios";

/**
 * ログインAPI
 * @param email
 * @param password
 * @returns
 */
export const signInApi = async (email: string, password: string) => {
  try {
    const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post(
      "auth/signin",
      {
        email,
        password,
      },
    );
    const res: ResponseType<AuthResponseType> = {
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
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};

/**
 * 会員登録API
 * @param name
 * @param email
 * @param password
 * @returns
 */
export const signUpApi = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post(
      "auth/sign_up",
      {
        name,
        email,
        password,
      },
    );
    const res: ResponseType<AuthResponseType> = {
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

/**
 * 認証チェックAPI
 * @returns
 */
export const authenticationApi = async () => {
  try {
    const { data }: AxiosResponse<AuthResponseType> = await globalAxios.post(
      "/auth/authentication/",
    );
    const res: ResponseType<AuthResponseType> = {
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
      res.code = axiosError.response.status;
      res.message = axiosError.response.data.message;
    }
    return res;
  }
};
