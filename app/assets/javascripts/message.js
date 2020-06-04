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
      
    })
  })
});