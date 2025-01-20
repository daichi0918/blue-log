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
