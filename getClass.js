var map = require('lodash.map')

module.exports = function ($classResult) {
  return {
    name: getTextContent($classResult, 'Class Name'),
    persons: map($classResult.querySelectorAll('PersonResult'), getPerson)
  }

  function getPerson($person) {
    return {
      name: map(['Given', 'Family'], getNameField).join(' '),
      position: getTextContent($person, 'Result > Position'),
      time: getTime(getTextContent($person, 'Result > Time'), getTextContent($person, 'Result > Status')),
      splits: getSplits($person.querySelectorAll('Result > SplitTime > Time'))
    }

    function getNameField(field) {
      return getTextContent($person, `Person > Name > ${field}`)
    }

    function getSplits(splits) {
      return map(map(splits, 'textContent'), getMmSs)
    }

    function getTime(totalSeconds, status = 'OK') {
      var statuses = {
        MissingPunch: 'felst',
        DidNotStart: 'dns'
      }

      if (status === 'OK')
        return getMmSs(totalSeconds)

      return statuses[status] || status
    }

    function getMmSs(totalSeconds) {
      var seconds = totalSeconds % 60
      var minutes = (totalSeconds - seconds) / 60
      return `${pad(minutes, '&#8199;')}:${pad(seconds, '0')}`

      function pad(n, c) {
        return n < 10 ? c + n : n
      }
    }
  }

  function getTextContent(parent, selector) {
    var element = parent.querySelector(selector)
    return element ? element.textContent : ' '
  }
}

