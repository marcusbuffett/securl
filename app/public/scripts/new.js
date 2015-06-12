/*globals validator, $*/
/*exported submitURL*/

console.log('yeah');
function submitURL() {
  var inputURL = $('input[type="text"]').val();
  var inputPass = $('input[type="password"]').val();
  console.log(inputURL);
  if (true /*validator.isURL(inputURL)*/) {
    var destination = '/submit?';
    var params = {url:inputURL, password: inputPass};
    destination += $.param(params);
    window.location.href = destination;
  }
  //TODO: else

}
