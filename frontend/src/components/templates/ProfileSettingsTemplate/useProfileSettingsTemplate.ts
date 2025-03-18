/**
 * useProfileSettingsTemplate
 *
 * @package templates
 */
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateUser } from "@/apis/authApi";
import { NAVIGATION_PATH } from "@/constants/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { type EventType } from "@/type/Event";

/**
 * useProfileSettingsTemplate
 */
export const useProfileSettingsTemplate = () => {
  // 認証リダイレクトを実行
  useAuthRedirect();

  const router = useRouter();
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);
  const { id } = useParams();
  /* state定義 */
  const [imageIcon, setImageIcon] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string | undefined>("");
  const [profile, setProfile] = useState<string | undefined>("");
  const [twitter, setTwitter] = useState<string | undefined>("");
  const [github, setGithub] = useState<string | undefined>("");
  const [facebook, setFacebook] = useState<string | undefined>("");

  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  /* action定義 */
  /**
   * ユーザー名のインプット
   * @param {e}
   */
  const handleInputUserName: EventType["onChangeInput"] = useCallback((e) => {
    setUserName(e.target.value);
  }, []);
  /**
   * 自己紹介文のインプット
   * @param {e}
   */
  const handleTextAreaProfile: EventType["onChangeTextArea"] = useCallback(
    (e) => {
      setProfile(e.target.value);
    },
    [],
  );

  /**
   * twitterのインプット
   * @param {e}
   */
  const handleInputTwitter: EventType["onChangeInput"] = useCallback((e) => {
    setTwitter(e.target.value);
  }, []);
  /**
   * githubのインプット
   * @param {e}
   */
  const handleInputGithub: EventType["onChangeInput"] = useCallback((e) => {
    setGithub(e.target.value);
  }, []);

  /**
   * facebookのインプット
   * @param {e}
   */
  const handleInputFacebook: EventType["onChangeInput"] = useCallback((e) => {
    setFacebook(e.target.value);
  }, []);

  /**
   *
   */
  const handleUpdateUser = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const res = await updateUser(
        String(user?.id),
        imageIcon,
        userName,
        profile,
        twitter,
        github,
        facebook,
      );
      if (res?.code >= 400) {
        alert(res.message);
        return;
      }
      if (res?.data) {
        setImageIcon(res?.data.image);
        setUserName(res?.data.name);
        setProfile(res?.data.profile);
        setTwitter(res?.data.twitter);
        setGithub(res?.data.github);
        setFacebook(res?.data.facebook);

        router.push(NAVIGATION_PATH.TOP);
      }
    },
    [user?.id, imageIcon, userName, profile, twitter, github, facebook, router],
  );
  useEffect(() => {
    if (user) {
      setImageIcon(user.image);
      setUserName(user.name);
      setProfile(user.profile);
      setTwitter(user.twitter);
      setGithub(user.github);
      setFacebook(user.facebook);
    }
  }, [isAuth, user?.id, id, user, router]);

  return {
    imageIcon,
    userName,
    profile,
    twitter,
    github,
    facebook,
    handleInputUserName,
    handleTextAreaProfile,
    handleInputTwitter,
    handleInputGithub,
    handleInputFacebook,
    handleUpdateUser,
  };
};
