# Milliday

## 概要

twitterでミリマスのキャラの誕生日を呟くBotです。  

## 機能

実装している機能は以下の通りです。

### 今日の誕生日
その日誕生日のキャラクターを0時に呟きます。  
同時に、アイコンの画像をそのキャラクターに変更します。  
該当するキャラクターがいなければ、いないというツイートをします。

### 明日の誕生日
明日誕生日のキャラクターを前日23時30分に呟きます。

### 今週の誕生日
今週誕生日のキャラクターを毎週日曜日0時に呟きます。

### 今月の誕生日
今月誕生日のキャラクターを毎週日曜日0時に呟きます。

## モジュールのインストール

```
npm install
```

## 実行

実行する方法は以下の二通りがあります。

### 通常実行
```
app.js
```

### foreverを用いてデーモン化
```
npm install -g forever // foreverのインストール
forever start -w app.js // デーモン化
```
オプションの-wは、Node.jsファイルの中身を編集した際に自動的に検知して再実行してくれる監視オプションです。

## Botのトークンファイル作成

token.jsonを作成して、以下のように使用したいBotのトークンをjson形式で記述してください。
```
{
  "consumer_key": "***",
  "consumer_secret": "***",
  "access_token_key" "***"
  "access_token_secret" "***"
}
```

## パッケージの構成

以下の構成を参考にして、icon、token.jsonを配置してください。  
birthday.jsonも変更可能です。  
birthday.jsonのデータは、[キャラクターの名前, 月, 日, iconファイル名(.pngは付けない)]とすれば良いです。  
iconの画像データはPNG形式のみになっています。(変更するかもしれません)

```
Milliday/
    ├ data/
    |   ├ birthday.json  // 誕生日のデータ
    |   ├ tweet.json  // ツイートのデータ
    |   └ icon/ // ここにアイコンの画像を入れる
    ├ app.js
    ├ package-lock.json
    ├ package.json
    ├ token.json
    ├ .gitignore
    └ README.md
```

## BotのURL

https://twitter.com/MillionBirthday