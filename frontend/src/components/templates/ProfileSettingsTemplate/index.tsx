"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { AuthContext } from "@/contexts/AuthContext";
import { type EventType } from "@/type/Event";

/**
 * ProfilesSettingsTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * ProfilesSettingsTemplate
 * @returns {JSX.Element}
 */
export const ProfilesSettingsTemplate = () => {
  const router = useRouter();
  // 認証情報を取得
  const { isAuth, user } = useContext(AuthContext);
  /* state定義 */
  const [inputArticleSearch, setInputArticleSearch] = useState<string>("");
  const [imageIcon, setImageIcon] = useState<string | undefined>(user?.image);
  const [userName, setUserName] = useState<string | undefined>(user?.name);
  const [profile, setProfile] = useState<string | undefined>(user?.profile);
  const [twitter, setTwitter] = useState<string | undefined>(user?.twitter);
  const [github, setGithub] = useState<string | undefined>(user?.github);
  const [facebook, setFacebook] = useState<string | undefined>(user?.facebook);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  /* action定義 */
  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
  }, []);
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

  // const handleImageUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("userId", user?.id.toString()); // ユーザーIDを送信

  //   try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       setImagePreview(result.filePath); // アップロードした画像のパスを保存
  //     } else {
  //       console.error("アップロードに失敗しました", result);
  //     }
  //   } catch (error) {
  //     console.error("アップロード中にエラーが発生しました", error);
  //   }
  // };
  console.log("isAuth");
  console.log(isAuth);
  console.log("user");
  console.log(user);
  useEffect(() => {
    if (isAuth === null || user === undefined) {
      return; // 初回レンダリングでまだ値が設定されていない場合は何もしない
    }

    if (!isAuth || Object.keys(user).length === 0) {
      void router.push("/");
    }
  }, [isAuth, user, router]);

  return (
    <>
      <Header
        user={user}
        isAuth={isAuth}
        searchInputValue={inputArticleSearch}
        handleInputSearch={handleInputSearch}
      />
      <PageContainer>
        <main className={style.container}>
          <section className={`${style.section} ${style.sectionTop}`}>
            <nav className={style.navContent}>
              <ul className={style.selectList}>
                <li className={style.select}>プロフィール</li>
              </ul>
            </nav>
          </section>
          <section className={style.section}>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="icon-upload" className={style.contentTitle}>
                アイコン
              </label>
              <input type="file" />
            </fieldset>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="username" className={style.contentTitle}>
                ユーザー名
              </label>
              <InputForm
                id={"username"}
                additionalStyle={{ width: "360px" }}
                value={userName ?? ""}
                onChange={handleInputUserName}
              />
            </fieldset>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="profile" className={style.contentTitle}>
                自己紹介文
              </label>
              <textarea
                id="profile"
                className={style.textarea}
                rows={5}
                value={profile ?? ""}
                onChange={handleTextAreaProfile}
              ></textarea>
            </fieldset>
            <h3 className={style.socialLinkTitle}>ソーシャルリンク</h3>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="twitter" className={style.contentTitle}>
                X
              </label>
              <InputForm
                id={"twitter"}
                additionalStyle={{ width: "360px" }}
                value={twitter ?? ""}
                onChange={handleInputTwitter}
              />
            </fieldset>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="github" className={style.contentTitle}>
                Github
              </label>
              <InputForm
                id={"github"}
                additionalStyle={{ width: "360px" }}
                value={github ?? ""}
                onChange={handleInputGithub}
              />
            </fieldset>
            <fieldset className={style.contentWrapper}>
              <label htmlFor="facebook" className={style.contentTitle}>
                Facebook
              </label>
              <InputForm
                id={"facebook"}
                additionalStyle={{ width: "360px" }}
                value={facebook ?? ""}
                onChange={handleInputFacebook}
              />
            </fieldset>
          </section>
          <section className={style.section}>
            <BaseButton
              color={"primary"}
              size={"small"}
              text={"保存"}
              additionalStyle={{
                paddingBlock: "0.35em 0.625em",
                paddingInline: "0.75em",
              }}
            />
          </section>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
};
