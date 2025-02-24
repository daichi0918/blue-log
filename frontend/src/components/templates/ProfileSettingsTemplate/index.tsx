"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  /* action定義 */
  /**
   * キーワード検索Input
   * @param {e}
   */
  const handleInputSearch: EventType["onChangeInput"] = useCallback((e) => {
    setInputArticleSearch(e.target.value);
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
            <div>
              <p className={style.contentTitle}>アイコン</p>
              <input type="file" />
            </div>
          </section>
        </main>
      </PageContainer>
      <Footer />
    </>
  );
};
