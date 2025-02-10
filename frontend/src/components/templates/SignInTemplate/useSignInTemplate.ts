/**
 * useSignInTemplate
 *
 * @package templates
 */
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInApi } from "@/apis/authApi";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type EventType } from "@/type/Event";
import crypto from "crypto-js";

/**
 * useSignInTemplate
 */
export const useSignInTemplate = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  /* state定義 */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  /* action定義 */
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputEmail: EventType["onChangeInput"] = useCallback((e) => {
    const value = e.target.value ?? "";
    setEmail(value);
  }, []);
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputPassword: EventType["onChangeInput"] = useCallback((e) => {
    const value = e.target.value ?? "";
    setPassword(value);
  }, []);
  /**
   * パスワードの表示切り替え
   */
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);
  /**
   * 新規登録画面への遷移
   */
  const navigateToSignUp = useCallback(() => {
    router.push("/signup");
  }, [router]);
  /**
   * ログイン
   */
  const handleLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const res = await signInApi(email, password);
      if (res?.code >= 400) {
        alert(res.message);
        return;
      }
      if (res?.data?.user) {
        await signIn(res.data.user);
        console.log(res.data);
        // 暗号化
        const ecrypted = crypto.AES.encrypt(res.data.accessToken, "hogefuga");
        localStorage.setItem("access_token", ecrypted.toString());
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [email, password, router, signIn],
  );

  return {
    email,
    password,
    isPasswordVisible,
    handleInputEmail,
    handleInputPassword,
    togglePasswordVisibility,
    navigateToSignUp,
    handleLogin,
  };
};
