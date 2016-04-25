module.exports = callback => {
  var request = new XMLHttpRequest()
  request.open('GET', 'result.xml', true)

  request.onload = function () {
    if (this.status >= 200 && this.status < 400)
      callback(this.responseXML)
  }

  request.send()
}
