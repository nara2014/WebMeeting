//音声認識の準備
const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

//使用する変数を用意
const join = document.getElementById('join');
const content = document.getElementById('content');

join.addEventListener('click', function () {
  room = document.getElementById('join-room').value
  // 音声認識をスタート
  speech.start();
  // チャット
  text();
});

//--------------- 追加 endcall ---------------//
const endcall = document.getElementById('end-call');
endcall.addEventListener('click', function () {
  location.reload();
})

//音声自動文字起こし機能
speech.onresult = function (e) {
  speech.stop();
  if (e.results[0].isFinal) {
    var autotext = e.results[0][0].transcript
    console.log(e);
    console.log(autotext);

    newPostRef.ref(room).push({
      username: username.value,
      text: autotext,
      time: time()
    });

  }
}

speech.onend = () => {
  speech.start()
};
