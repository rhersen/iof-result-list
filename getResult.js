var fromPairs = require('lodash.frompairs')
var map = require('lodash.map')

module.exports = doc => fromPairs(map(doc.querySelectorAll('ClassResult'), pair))

function pair($classResult) {
  return [
    $classResult.querySelector('Class Name').textContent,
    map($classResult.querySelectorAll('PersonResult'), getPerson)
  ]

  function getPerson($person) {
    var $time = $person.querySelector('Result > Time')
    var $position = $person.querySelector('Result > Position')

    return {
      name: map(['Given', 'Family'], getNameField).join(' '),
      position: $position && $position.textContent,
      time: getTime($time && $time.textContent, $person.querySelector('Result > Status').textContent),
      splits: getSplits($person.querySelectorAll('Result > SplitTime > Time'))
    }

    function getNameField(field) {
      return $person.querySelector(`Person > Name > ${field}`).textContent
    }

    function getSplits(splits) {
      var prevSeconds = 0
      return map(map(splits, 'textContent'), lapTime)

      function lapTime(splitSeconds) {
        var lapSeconds = splitSeconds - prevSeconds
        prevSeconds = splitSeconds
        return getTime(lapSeconds)
      }
    }

    function getTime(totalSeconds, status = 'OK') {
      var statuses = {
        MissingPunch: 'felst.',
        DidNotStart: 'ej start'
      }

      if (status === 'OK')
        return getMmSs()

      return statuses[status] || status

      function getMmSs() {
        var seconds = totalSeconds % 60
        var minutes = (totalSeconds - seconds) / 60
        var pad = seconds < 10 ? '0' : ''
        return `${minutes}:${pad}${seconds}`
      }
    }
  }
}

