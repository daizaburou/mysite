## 環境
node: 12.5.0
npm: 6.14.5
VSCode

## ディレクトリ
```
.
├── src
│   ├── pug // _(アンダーバー)つきは、ビルド対象にされないファイル。
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

### 開発環境サーバー
ejs, scss, jsの変更をウォッチしながらローカルサーバーを起動する。
```

### ビルド
ejs, scss, jsがビルドされる。
```
