"use client";

import { ScrollTopIcon } from "@/components/atoms/ScrollTopIcon";
import { ArticleContentWrapper } from "@/components/layouts/ArticleContentWrapper";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { MarkdonwPreview } from "@/components/molecules/MarkdonwPreview";

/**
 * TermsOfServiceTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * TermsOfServiceTemplate
 * @returns {JSX.Element}
 */
export const TermsOfServiceTemplate = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <section className={style.section}>
          <ArticleContentWrapper>
            <h1 className={style.title}>利用規約</h1>
            <p className={style.text}>
              この利用規約（以下、「本規約」）は、BlueLog（以下、「当サイト」）の提供するサービス（以下、「本サービス」）の利用条件を定めるものです。利用者は、本サービスを利用することで本規約に同意したものとみなします。
            </p>
            <MarkdonwPreview text={termsOfServiceMarkdown}></MarkdonwPreview>
          </ArticleContentWrapper>
        </section>
      </PageContainer>
      {/* スクロールトップアイコン */}
      <ScrollTopIcon />
      <Footer />
    </>
  );
};

const termsOfServiceMarkdown = `
## 1. 適用範囲
本規約は、当サイトを利用するすべてのユーザーに適用されます。

## 2. 禁止事項
利用者は、本サービスの利用にあたり、以下の行為を禁止します。
- 法令または公序良俗に違反する行為
- 他の利用者、第三者の権利・利益を侵害する行為
- 虚偽の情報を提供する行為
- 不正アクセスやサーバーに過度な負担をかける行為
- その他、運営者が不適切と判断する行為

## 3. 免責事項
- 当サイトのコンテンツは、正確性・安全性を保証するものではありません。
- 本サービスの利用により生じた損害について、当サイトは一切の責任を負いません。
- 予告なくサービスの内容変更・中断・終了を行うことがあります。

## 4. 知的財産権
当サイトに掲載されているコンテンツ（文章・画像・デザイン等）の著作権は、運営者または正当な権利者に帰属します。無断転載・複製を禁止します。

## 5. プライバシー
当サイトは、利用者の個人情報を適切に取り扱います。詳細は[プライバシーポリシー]をご参照ください。

## 6. 規約の変更
本規約は、必要に応じて変更することがあります。変更後の規約は当サイトに掲載した時点で効力を持つものとします。

## 7. 準拠法・裁判管轄
本規約の解釈・適用には、日本法が適用されます。紛争が生じた場合は、運営者の所在地を管轄する裁判所を専属的合意管轄とします。



制定日: 2025-03-17

最終更新日: 2025-03-17
`;
