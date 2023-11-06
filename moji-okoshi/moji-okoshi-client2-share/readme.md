# moji-okoshi-v2

## Flow

### 端末

- クライアント1(C1) ... 文字起こし専用端末
- クライアント2(C2) ... 文字起こしされたものを表示するだけ
- web-server
- database

### 処理の流れ

1. C1がweb-serverにHTTPアクセスする。
1. 共有コードと認証コードを発行する。→自動的にweb-server経由でdatabaseに記録される。
1. C1が文字起こしを開始する。→1件ごとにweb-server経由でdatabaseに記録される。
1. C2がweb-serverにHTTPアクセスする。
1. C2が見る専モードに設定する。
1. 共有コードと認証コードを入力する。
1. C2の画面に文字起こしされてテキスト化されたものが表示される。

### Databaseに保存されるもの

| 内容                   | DB上の名称    | 型   | 属性                        | 備考                        | 
| :--------------------: | :-----------: | :--: | --------------------------- | --------------------------- | 
| UUID                   | uuid          | text | primary / unique / not null | タイムスタンプ + 共有コード | 
| タイムスタンプ         | iat           | int  | unique / not null           |                             | 
| 共有コード             | sharecode     | text | not null                    |                             | 
| 認証コード             | authncode     | text | not null                    |                             | 
| 文字起こし元IPアドレス | clientip      | text | not null                    |                             | 
| 文字起こしされたデータ | transcription | text | not null                    |                             | 
