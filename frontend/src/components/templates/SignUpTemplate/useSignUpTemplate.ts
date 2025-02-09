/**
 * useSignUpTemplate
 *
 * @package templates
 */
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signUpApi } from "@/apis/authApi";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type EventType } from "@/type/Event";
import crypto from "crypto-js";

/**
 * useSignUpTemplate
 */
export const useSignUpTemplate = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  /* state定義 */
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  /* action定義 */
  /**
   * nameのインプット
   * @param {e}
   */
  const handleInputName: EventType["onChangeInput"] = useCallback((e) => {
    setName(e.target.value);
  }, []);
  /**
   * emailのインプット
   * @param {e}
   */
  const handleInputEmail: EventType["onChangeInput"] = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  /**
   * passwordのインプット
   * @param {e}
   */
  const handleInputPassword: EventType["onChangeInput"] = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  /**
   * パスワードの表示切り替え
   */
  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);
  /**
   * ログイン画面への遷移
   */
  const navigateToSignIn = useCallback(() => {
    router.push("/signin");
  }, [router]);

  /**
   * サインアップ処理
   */
  const handleSignUp = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Form Submitted with values:", {
        name,
        email,
        password,
      });
      const res = await signUpApi(name, email, password);
      if (res?.code >= 400) {
        alert(res.message);
        return;
      }
      if (res?.data?.user) {
        await signIn(res.data.user);
        const ecrypted = crypto.AES.encrypt(res.data.accessToken, "hogefuga");
        localStorage.setItem("access_token", ecrypted.toString());
        // localStorage.setItem('access_token', res.data.accessToken);
        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [name, email, password, router, signIn],
  );

  return {
    name,
    email,
    password,
    isPasswordVisible,
    handleInputName,
    handleInputEmail,
    handleInputPassword,
    togglePasswordVisibility,
    navigateToSignIn,
    handleSignUp,
  };
};
