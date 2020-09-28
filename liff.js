$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    var liffId = "1654922011-kRqVLP46";
    initializeLiff(liffId);
    
    
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }
        })
        .catch((err) => {
            window.alert('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
        shareTargetPicker(text);
    } else {
        sendMessages(text);
    }
}

// LINEトーク画面上でメッセージ送信

function sendMessages(text) {
    liff.sendMessages([{
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ロボホンに送信しました",
          "size": "lg",
          "align": "center",
          "weight": "bold",
          "color": "#340AD9"
        },
        {
          "type": "separator"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": text,
          "size": "lg",
          "align": "start",
          "gravity": "top",
          "color": "#BF0202",
          "wrap": true
        },
        {
          "type": "separator"
        }
      ]
    }
  }
}]).then(function () {
        //liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
/*
function sendMessages(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
*/
// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
/* ------------------------------
 表示用の関数
 ------------------------------ */
function dispLoading(msg){
  // 引数なしの場合、メッセージは非表示。
  if(msg === undefined ) msg = "";
  
  // 画面表示メッセージを埋め込み
  var innerMsg = "<div id='innerMsg'>" + msg + "</div>";  
  
  // ローディング画像が非表示かどうかチェックし、非表示の場合のみ出力。
  if($("#nowLoading").length == 0){
    $("body").append("<div id='nowLoading'>" + innerMsg + "</div>");
  }
}
 
/* ------------------------------
 表示ストップ用の関数
 ------------------------------ */
function removeLoading(){
  $("#nowLoading").remove();
}  
