$(function() {
  function appendUser(user) {
    let html = 
    `<div class="ChatMember clearfix">
        <p class="ChatMember__name">${user.name}</p>
        <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`;
    $("#UserSearchResult").append(html);
  }

  function appendNoUser() {
    let html = 
    `<div class="ChatMember clearfix">
      <p class="ChatMember__name">ユーザーが見つかりません</p>
    </div>`;
    $("#UserSearchResult").append(html)
  }

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });

  function appendMember(userName, userId) {
    let html =
      `<div class="ChatMember">
        <p class="ChatMember__name">${userName}</p>
        <input name="group[user_ids][]" type="hidden" value="${userId}" />
        <div class="ChatMember__remove ChatMember__button">削除</div>
      </div>`;
      $(".ChatMembers").append(html);
  }

  $("#UserSearchResult").on('click', ".ChatMember__add", function(){
    let userName = $(this).attr("data-user-name");
    let userId = $(this).attr("data-user-id");
    $(this).unwrap();
    appendMember(userName, userId);
  })
});