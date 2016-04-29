var map = require('lodash.map')

module.exports = function ($classResult) {
  return {
    name: $classResult.querySelector('Class Name').textContent,
    persons: map($classResult.querySelectorAll('PersonResult'), getPerson)
  }

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
      return map(map(splits, 'textContent'), getMmSs)
    }

    function getTime(totalSeconds, status = 'OK') {
      var statuses = {
        MissingPunch: 'felst.',
        DidNotStart: 'ej start'
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
}

