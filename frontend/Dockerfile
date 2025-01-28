# ベースイメージ
FROM node:18-alpine

# pnpm のインストール
RUN npm install -g pnpm

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# 依存パッケージをインストール
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

# アプリケーションコードをコピー
COPY . .

# ビルドコマンド（必要に応じて変更可能）
RUN pnpm build

# ポート設定
EXPOSE 3000

# デフォルトの起動コマンド
CMD ["pnpm", "run", "dev"]
