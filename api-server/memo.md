# prisma セットアップ

### 初期セットアップ

```
npm i prisma
npx prisma init
```

### migration

```
npx prisma migrate dev --name article
_init
```

### prisma-clientインストール

```
npm i @prisma/client

※migrationした時にインストールはされている
```

### prismaファイル作成

```
nest g module prisma
nest g service prisma --no-spec
```

### class-validatorインストール

```
npm i class-validator class-transfor
mer
```

### ユーザー追加コマンド

```
npx prisma migrate dev --name addUser
```

### bcryptインストール

```
npm i bcryptjs
npm i -D @types/bcryptjs
```

### passportインストール

```
npm i passport @nestjs/passport
```

### jwtインストール

```
npm i passport-jwt @nestjs/jwt
```

### 秘密鍵(JWT_SECRET)で使うランダムの文字列生成コマンド

```
openssl rand -hex 32
```
