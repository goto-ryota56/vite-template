# Vite を活用した WEB サイト制作テンプレート

## インクルードの書き方

**components ディレクトリ**の中に **parts.html** を作る。
読み込みたい箇所に **{{> parts}}**

## 下層ページの作り方

**vite.config.js** の build option の **input** を調整する。

## 外部ファイルの読み込み

普段通り html ファイルに記述できる。
カレントファイルから見た相対パスで記述するとビルド後に相対パスでリンクされる。
script タグは **type="module"** を付ける
.scss .ts での読み込みもできる
scripts の中身は js でも ts でも可能

## 共通ナビ等のリンク

普段通り href 属性にルートパスで記述できる。
