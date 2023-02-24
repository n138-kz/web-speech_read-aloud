var CACHE_NAME  = "cache_1-0-0";
var urlsToCache = [
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
  "https://code.jquery.com/jquery-3.5.1.min.js",
  "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js",
  "https://apis.google.com/js/api.js",
];
console.log(urlsToCache);

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', function(event) {
  console.debug('[LOGGER]Service-Worker: install');

  event.waitUntil(
    caches
      .open(CACHE_NAME) // 上記で指定しているキャッシュ名
      .then(function(cache){
        return cache.addAll(urlsToCache); // 指定したリソースをキャッシュへ追加
        // 1つでも失敗したらService Workerのインストールはスキップされる
      })
      .catch(function (error) {
        console.error(error);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.debug('[LOGGER]Service-Worker: fetch');

  //ブラウザが回線に接続しているかをboolで返してくれる
  var online = navigator.onLine;
  console.debug('[LOGGER]Service-Worker: internet-connected:',online);

  //回線が使えるときの処理
  if(online){
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
          if (response) {
            return response;
          }
          //ローカルにキャッシュがあればすぐ返して終わりですが、
          //無かった場合はここで新しく取得します
          return fetch(event.request)
            .then(function(response){
              // 取得できたリソースは表示にも使うが、キャッシュにも追加しておきます
              // ただし、Responseはストリームなのでキャッシュのために使用してしまうと、ブラウザの表示で不具合が起こる(っぽい)ので、複製しましょう
              cloneResponse = response.clone();
              if(response){

                if(response || response.status == 200){
                  //現行のキャッシュに追加
                  caches.open(CACHE_NAME)
                    .then(function(cache) {
                      cache.put(event.request, cloneResponse)
                      .then(function(){
                        //正常にキャッシュ追加できたときの処理(必要であれば)
                      });
                    });
                }else{
                  //正常に取得できなかったときにハンドリングしてもよい
                  return response;
                }
                return response;
              }
            }).catch(function(error) {
              //デバッグ用
              return console.error(error);
            });
        })
    );
  }else{
    //オフラインのときの制御
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // キャッシュがあったのでそのレスポンスを返す
          if (response) {
            return response;
          }
          //オフラインでキャッシュもなかったパターン
          return caches.match("offline.html")
            .then(function(responseNodata)
            {
              //適当な変数にオフラインのときに渡すリソースを入れて返却
              //今回はoffline.htmlを返しています
              return responseNodata;
            });
        }
      )
    );
  }
});
