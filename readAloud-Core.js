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

    uttr.removeEventListener('start',    () => {});
    uttr.removeEventListener('pause',    () => {});
    uttr.removeEventListener('resume',   () => {});
    uttr.removeEventListener('end',      () => {});
    uttr.removeEventListener('mark',     () => {});
    uttr.removeEventListener('boundary', () => {});
    uttr.removeEventListener('error',    () => {});
    uttr.addEventListener('start', (event) => {
      console.log(event);
    });
    uttr.addEventListener('pause', (event) => {
      console.log(event);
    });
    uttr.addEventListener('resume', (event) => {
      console.log(event);
    });
    uttr.addEventListener('end', (event) => {
      console.log(event);
    });
    uttr.addEventListener('mark', (event) => {
      console.log(event);
    });
    uttr.addEventListener('boundary', (event) => {
      console.log(event);
    });
    uttr.addEventListener('error', (event) => {
      console.error(event);
    });

    // テキストを設定 (必須)
    uttr.text = text;

    // デフォルトの設定
    let dfltConf = {'lang':'ja-JP','rate':1,'pitch':1,'volume':1};

    // ユーザの設定を取得
    let userConf = sessionStorage.getItem( (btoa(location.href)).slice(0, 16) + '.readAloud' );
    userConf = (userConf === undefined || userConf === null) ? dfltConf : JSON.parse(userConf);

    // 言語を設定
    uttr.lang   = (userConf.lang   === undefined || userConf.lang   === null) ? dfltConf.lang   : userConf.lang;

    // 速度を設定 (初期値:1 / 範囲 0.1-10 )
    uttr.rate   = (userConf.rate   === undefined || userConf.rate   === null) ? dfltConf.rate   : userConf.rate;

    // 高さを設定 (初期値:1 / 範囲 0-2 )
    uttr.pitch  = (userConf.pitch  === undefined || userConf.pitch  === null) ? dfltConf.pitch  : userConf.pitch;

    // 音量を設定 (初期値:1 / 範囲 0-1 )
    uttr.volume = (userConf.volume === undefined || userConf.volume === null) ? dfltConf.volume : userConf.volume;

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
function readAloud_play(text) {
  readAloud(text);
}
function readAloud_stop() {
  window.speechSynthesis.cancel();
}
