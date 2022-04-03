# Test-Web-Speech-API
Web Speech API Test

refs:
- [Webページでブラウザの音声認識機能を使おう | Qiita](https://qiita.com/hmmrjn/items/4b77a86030ed0071f548)
- [Webページでブラウザの音声合成機能を使おう | Qiita](https://qiita.com/hmmrjn/items/be29c62ba4e4a02d305c)

```JavaScript
<!-- スクリプト部分 -->
function speak(){
  var speak   = new SpeechSynthesisUtterance();
  speak.text  = document.querySelector('.text').value;
  speak.rate  = 1; // 読み上げ速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5, )
  speak.pitch = 0;　// 声の高さ 0-2 初期値:1(0で女性の声) 
  speak.lang  = 'ja-JP'; //(日本語:ja-JP, アメリカ英語:en-US, イギリス英語:en-GB, 中国語:zh-CN, 韓国語:ko-KR)

  sleep(2000);
  speechSynthesis.speak(speak);
}

function sleep(time){
  var startMsec = new Date();
  while ((new Date() - startMsec) < time);
  return;
};
```
