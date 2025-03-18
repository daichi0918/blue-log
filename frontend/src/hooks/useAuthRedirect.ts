/**
 * useAuthRedirect
 *
 * @package hooks
 */
import { useContext, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuth, user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    // 認証チェックとリダイレクト処理
    if (!isAuth) {
      router.push("/signin");
    } else if (pathname.startsWith("/user") && String(user?.id) !== id) {
      router.push("/");
    }
  }, [isAuth, user?.id, id, router, pathname]);
};
