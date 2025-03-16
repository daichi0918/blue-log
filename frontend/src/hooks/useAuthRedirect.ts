/**
 * useAuthRedirect
 *
 * @package hooks
 */
import { useContext, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuthRedirect = () => {
  const router = useRouter();
  const { isAuth, user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    // 認証チェックとリダイレクト処理
    if (!isAuth) {
      router.push("/signin"); // isAuthがfalseの場合はsigninにリダイレクト
    } else if (user?.id !== id) {
      router.push("/"); // isAuthがtrueだがuser.idが異なる場合はトップにリダイレクト
    }
  }, [isAuth, user?.id, id, router]);
};
