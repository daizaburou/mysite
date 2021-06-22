# 命名ルール
クラス名はケバブケース
▼例
class="main-vis",class="global-nav"

cssの装飾はclass、js、アンカーで活用する場合はidを用いる。
マージンは下につけるようにする

## 環境
node: 12.4.0
npm: 6.9.0
VSCode

## ディレクトリ
```
.
├── src
│   ├── lang
│   │   └── *.csv // 翻訳データ
│   ├── pug // _(アンダーバー)つきは、ビルド対象にされないファイル。
│   │   ├── _data
│   │   │   ├── lang
│   │   │   │   └── *.json
│   │   │   ├── languages.js // トップの言語一覧
│   │   │   └── pages.js // pugの書き出し設定
│   │   ├── _layouts
│   │   ├── _mixins
│   │   ├── _template
│   │   ├── _parts
│   │   └── *.pug
│   ├── scss
│   │   ├── foundation
│   │   │   ├── _destyle.scss // https://github.com/nicolas-cusan/destyle.css
│   │   │   ├── _base.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── layout
│   │   │   └── _layout.scss
│   │   ├── object
│   │   │   ├── component
│   │   │   ├── project
│   │   │   └── utility
│   │   └── style.scss
│   └── js // webpackでバンドル
│       ├── main.js
│       └── modules
├── dist
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── images // 画像はdist下に直接配置
│   │       └── *.jpg
│   └── index.html
├── conf
│   └── config.json // ビルド時に保持しておくべき設定
└── 設定ファイル各種
```

## ブランチルール

|ブランチ  |説明  |
|---------|---------|
|master     | FIXしたデータ |
|develop     | 確認環境 |
|feature/{内容}| 作業ブランチ |

### 流れ
1. masterからfeatureブランチを作成
2. featureブランチで作業
3. 作業後、featureからdevelopにマージしてテストアップ
4. 確認後、featureからmasterにマージ

## 命名規則
### クラス名
FLOCSS (MindBEMding) に従う。
https://github.com/hiloki/flocss

JSから操作するためのクラス名には`js-`をつける。
状態を表す場合には `is-`をつける。

英単語を省略しない。（`ttl`などにせず、`title`とする）

### 色
CSSで使用する色は`_variables.scss`に変数宣言する。
名前は [Name That Color](https://marketplace.visualstudio.com/items?itemName=guillaumedoutriaux.name-that-color ) の拡張機能で生成される名前とする。

例えば、`#AD7FAC;`であれば、`$color-bouquet`とする。

### 画像ファイル名

`カテゴリ[_名前][_連番][_状態].拡張子` の形式

#### 例
- hero_01_pc.jpg
- hero_01_sp.jpg
- text_about-title_02.png
- icon_open-in-new_black.svg
- icon_open-in-new_white.svg
- image_01.jpg

#### カテゴリ分類
- hero メインビジュアル
- figure グラフ・図（テキストや数字が配されるもの）
- bg 背景画像
- icon アイコン
- logo ロゴ
- banner バナー。リンクエリアになる画像
- text 画像化した文字
- favicon ファビコン
- og OGP画像
- image 上記に当てはまらない画像全般

## src/pug/_templatesの書き出し
src/pug/_templates の pugファイルは、
src/pug/_data/pages.jsに記述した内容に基づいて書き出されます。

## コマンドなど
### 準備
```
yarn install
```

### VSCodeの設定
以下の拡張機能をインストールすることを推奨します。

- ESLint
- stylelint
- Code Spell Checker
- Name That Color

.vscode/settings.jsonにLintのオートフィックス設定を記述してあります。

### 開発環境サーバー
pug, scss, jsの変更をウォッチしながらローカルサーバーを起動する。
```
yarn run watch
```

### ビルド
pug, scss, jsがビルドされる。
```
yarn run build
```

### 本番ビルド
scss, jsをビルドし、内容に基づいてハッシュを保存する。
pugのビルド時にキャッシュ対策のクエリを付与する。
```
yarn run production
```

- クエリは `src/pug/_data/config/cachebustMappings.json` に出力されます。

## 検証範囲
- Google Chrome 最新版
- Internet Explorer 11
- Microsoft Edge 最新版
- Safari 最新版
- Mozilla Firefox 最新版
- Opera 最新版
