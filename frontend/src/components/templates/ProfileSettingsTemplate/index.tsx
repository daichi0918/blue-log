"use client";

import { BaseButton } from "@/components/atoms/BaseButton";
import { InputForm } from "@/components/atoms/InputForm";
import { ScrollTopIcon } from "@/components/atoms/ScrollTopIcon";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";

/**
 * ProfilesSettingsTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";
import { useProfileSettingsTemplate } from "./useProfileSettingsTemplate";

/**
 * ProfilesSettingsTemplate
 * @returns {JSX.Element}
 */
export const ProfilesSettingsTemplate = () => {
  const {
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
  } = useProfileSettingsTemplate();

  return (
    <>
      <Header />
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
            <form onSubmit={handleUpdateUser}>
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
              <BaseButton
                type={"submit"}
                color={"primary"}
                size={"small"}
                text={"保存"}
                additionalStyle={{
                  paddingBlock: "0.35em 0.625em",
                  paddingInline: "0.75em",
                }}
              />
            </form>
          </section>
        </main>
      </PageContainer>
      {/* スクロールトップアイコン */}
      <ScrollTopIcon />
      <Footer />
    </>
  );
};
