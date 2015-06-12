/*globals $*/
/*exported submitPass*/

//20 is the # of characters in the uuid
var uuid = window.location.href.slice(-20);
console.log(uuid);

function submitPass() {
  var inputPass = $('input[type="password"]').val();
  var sendObject = {
    password: inputPass,
    uuid: uuid
  };
  $.ajax({
    url: '/submit-pass',
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendObject),
  })
  .done(function(data) {
    console.log(data);
  });
  //TODO: else

}
