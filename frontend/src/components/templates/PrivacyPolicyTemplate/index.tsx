"use client";

import { ArticleContentWrapper } from "@/components/layouts/ArticleContentWrapper";
import { Footer } from "@/components/layouts/Footer";
import { Header } from "@/components/layouts/Header";
import { PageContainer } from "@/components/layouts/PageContainer";
import { MarkdonwPreview } from "@/components/molecules/MarkdonwPreview";

/**
 * PrivacyPolicyTemplate
 *
 * @package templates
 */
import style from "./styles.module.css";

/**
 * PrivacyPolicyTemplate
 * @returns {JSX.Element}
 */
export const PrivacyPolicyTemplate = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <section className={style.section}>
          <ArticleContentWrapper>
            <h1 className={style.title}>プライバシーポリシー</h1>
            <p className={style.text}>
              BlueLog（以下、「当サイト」）では、利用者のプライバシーを尊重し、個人情報の適切な取り扱いに努めます。本プライバシーポリシーでは、当サイトが収集する情報とその利用目的について説明します。
            </p>
            <MarkdonwPreview text={privacyPolicyMarkdown}></MarkdonwPreview>
          </ArticleContentWrapper>
        </section>
      </PageContainer>
      <Footer />
    </>
  );
};

const privacyPolicyMarkdown = `
## 1. 収集する情報
当サイトでは、以下の情報を収集する場合があります。
- お問い合わせフォームやコメント欄に入力された情報（名前、メールアドレスなど）
- サイト利用時に自動収集される情報（IPアドレス、ブラウザ情報、クッキーなど）

## 2. 情報の利用目的
収集した情報は、以下の目的で使用します。
- お問い合わせ対応のため
- コメントの管理および不正行為の防止のため
- サイトの利便性向上や分析のため
- 法令遵守のため

## 3. クッキー（Cookie）について
当サイトでは、アクセス解析や利便性向上のためにクッキーを使用する場合があります。クッキーの利用を希望しない場合は、ブラウザの設定で無効にすることができます。

## 4. 第三者サービスの利用
当サイトでは、以下の第三者サービスを利用することがあります。
- Google Analytics（アクセス解析）
- 広告配信サービス（該当する場合）

これらのサービスが収集する情報については、各サービスのプライバシーポリシーをご参照ください。

## 5. 個人情報の管理と保護
当サイトは、収集した個人情報を適切に管理し、不正アクセス、紛失、改ざん、漏洩の防止に努めます。

## 6. 個人情報の開示・訂正・削除
利用者が自身の個人情報の開示、訂正、削除を希望する場合は、お問い合わせフォームよりご連絡ください。

## 7. プライバシーポリシーの変更
本ポリシーの内容は、必要に応じて改定する場合があります。最新の内容は当ページにて公開します。

## 8. お問い合わせ
プライバシーポリシーに関するご質問は、当サイトのお問い合わせフォームよりご連絡ください。



制定日: 2025-03-17

最終更新日: 2025-03-17
`;
