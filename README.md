# [Test-Web-Speech-API](https://github.com/n138-kz/Test-Web-Speech-API)

Web Speech API Test

refs:

- [Webページでブラウザの音声認識機能を使おう | Qiita](https://qiita.com/hmmrjn/items/4b77a86030ed0071f548)
- [Webページでブラウザの音声合成機能を使おう | Qiita](https://qiita.com/hmmrjn/items/be29c62ba4e4a02d305c)
- [readAloud-Core.js](https://github.com/n138-kz/mondai-syu-kanri-system/blob/main/apps/html/scripts/readAloud-Core.js)

---

```JavaScript
function readAloud(text) {
  /*
  *
  * Quotes: https://web-creates.com/code/js-web-speech-api/
  * Description: ブラウザにWeb Speech API Speech Synthesis機能があるか判定し、使用可能であれば読上げを行う
  * How to use: 本スクリプトファイルをロードし、`readAloud("喋らせたい内容")` のように実行する。
  *
  */
  if ('speechSynthesis' in window) {

    // 発言を設定
    const uttr = new SpeechSynthesisUtterance();

    // テキストを設定 (必須)
    uttr.text = text;

    // ユーザの設定を取得
    let userConf = sessionStorage.getItem( (btoa(location.href)).slice(0, 16) + '.readAloud' );
    userConf = (userConf === undefined || userConf === null) ? {'lang':'ja-JP','rate':1,'pitch':1,'volume':1} : JSON.parse(userConf);

    // 言語を設定
    uttr.lang   = "ja-JP";
    uttr.lang   = (userConf.lang   === undefined || userConf.lang   === null) ? uttr.lang   : userConf.lang;

    // 速度を設定 (初期値:1 / 範囲 0.1-10 )
    uttr.rate   = 1;
    uttr.rate   = (userConf.rate   === undefined || userConf.rate   === null) ? uttr.rate   : userConf.rate;

    // 高さを設定 (初期値:1 / 範囲 0-2 )
    uttr.pitch  = 1;
    uttr.pitch  = (userConf.pitch  === undefined || userConf.pitch  === null) ? uttr.pitch  : userConf.pitch;

    // 音量を設定 (初期値:1 / 範囲 0-1 )
    uttr.volume = 1;
    uttr.volume = (userConf.volume === undefined || userConf.volume === null) ? uttr.volume : userConf.volume;

    // 実際に使用した設定を保存
    userConf = {'lang':uttr.lang,'rate':uttr.rate,'pitch':uttr.pitch,'volume':uttr.volume};
    sessionStorage.setItem( (btoa(location.href)).slice(0, 16) + '.readAloud', JSON.stringify(userConf) );
    console.debug(userConf);

    // 再生中の音声を停止
    window.speechSynthesis.cancel();

    // 発言を再生
    window.speechSynthesis.speak(uttr);
  } else {
    console.error('Speech synthesis has not supported');
    window.alert('Speech synthesis has not supported');
  }
}

```
