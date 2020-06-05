$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = 
      `<div class="messageBox">
        <div class="messageInfo">
          <div class="messageInfo__userName">
            ${message.user_name}
          </div>
          <div class="messageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
            <p class="message__content">
              ${message.content}
            </p>
          <img src="${message.image}", class: 'message__image'>
        </div>
      </div>`
      return html;
    } else {
      let html = 
      `<div class="messageBox">
      <div class="messageInfo">
        <div class="messageInfo__userName">
          ${message.user_name}
        </div>
        <div class="messageInfo__date">
          ${message.created_at}
        </div>
      </div>
      <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
      </div>
    </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.mainChat__messageList').append(html);
      $('form')[0].reset();
      $('.mainChat__messageList').animate({ scrollTop: $('.mainChat__messageList')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.messageBox:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      alert('error');
    });
  };
});