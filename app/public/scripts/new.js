/*globals validator, $*/
/*exported submitURL*/

$('form').submit(function(ev) {
  ev.preventDefault();
  submitURL();
});

function submitURL() {
  var inputURL = $('input[type="text"]').val();
  var inputPass = $('input[type="password"]').val();
  if (true /*validator.isURL(inputURL)*/) {
    var destination = '/submit?';
    var params = {url:inputURL, password: inputPass};
    destination += $.param(params);
    window.location.href = destination;
  }
  $.ajax({
    url: '/submit',
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({password: inputPass, url : inputURL})
  })
  .done(function(redirectURL) {
    window.location.href = redirectURL;
  });
  //TODO: else

}
