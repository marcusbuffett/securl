/*globals $*/
/*exported submitPass*/

//20 is the # of characters in the uuid
var uuid = window.location.href.split('/')[-1];
var urlComponents = window.location.href.split('/');
var uuid = urlComponents[urlComponents.length-1];


$('form').submit(function(ev) {
  ev.preventDefault();
  submitPass();
});

function submitPass() {
  var inputPass = $('input[type="password"]').val();
  var sendObject = {
    password: inputPass,
    uuid: uuid
  };
  console.log(uuid);
  $.ajax({
    url: '/submit-pass',
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendObject),
  })
  .fail(function() {
    $('.info').text('Incorrect password.');
    $('.info').addClass('error');

  })
  .done(function(url) {
    $('.info').text('Redirecting...');
    $('.info').removeClass('error');
    window.location.href = url;
  });

}
