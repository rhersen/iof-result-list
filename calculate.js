var map = require('lodash.map')

function calculate(raw) {
  return {
    name: raw.Name,
    persons: map(raw.PersonResults, getPerson)
  }
}

function getPerson(raw) {
  return {
    name: raw.Given,
    position: raw.Position,
    time: getMmSs(raw.Time),
    splits: raw.splits
  }
}

/*
function getTime(totalSeconds, status = 'OK') {
  var statuses = {
    MissingPunch: 'felst',
    DidNotStart: 'dns'
  }

  if (status === 'OK')
    return getMmSs(totalSeconds)

  return statuses[status] || status
}
*/

function getMmSs(totalSeconds) {
  var seconds = totalSeconds % 60
  var minutes = (totalSeconds - seconds) / 60
  return `${minutes}:${pad(seconds, '0')}`

  function pad(n, c) {
    return n < 10 ? c + n : n
  }
}

module.exports = calculate
