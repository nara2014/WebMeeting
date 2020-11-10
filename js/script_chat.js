// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCnCuIn4oS-_Hkd5hzTu1T_o_x7V5uGfF0",
  authDomain: "chatapp-nara2014.firebaseapp.com",
  databaseURL: "https://chatapp-nara2014.firebaseio.com",
  projectId: "chatapp-nara2014",
  storageBucket: "chatapp-nara2014.appspot.com",
  messagingSenderId: "676014464449",
  appId: "1:676014464449:web:a9bc667a750ece63296340",
  measurementId: "G-DMEP0WGKLL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Msg送信準備
const newPostRef = firebase.database();
let room = "room1";


const username = document.getElementById("username");
const output = document.getElementById("output")

//Msg送信処理
send.addEventListener('click', function () {
  newPostRef.ref(room).push({
    username: username.value,
    text: text.value,
    time: time()
  });
  text.value = "";
});

//Msg受信処理
//--------------- 変更 Msg受信処理を関数化---------------//
function text() {
  newPostRef.ref(room).on("child_added", function (data) {
    const v = data.val();
    const k = data.key;
    let str = "";

    str += '<div id="' + k + '" class="msg_main">'
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/icon_person.png" alt="" class="icon ' + v.username +
      '" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';

    output.innerHTML += str;

    //--------------- 追加 自動スクロール機能を追加 ---------------//
    $("#output").scrollTop($("#output")[0].scrollHeight);

  });

}

//時間を取得する関数
function time() {
  var date = new Date();
  var hh = ("0" + date.getHours()).slice(-2);
  var min = ("0" + date.getMinutes()).slice(-2);
  var sec = ("0" + date.getSeconds()).slice(-2);

  var time = hh + ":" + min + ":" + sec;
  return time;
}
