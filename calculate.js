var map = require('lodash.map')

function calculate(raw) {
  return {
    name: raw.Name,
    persons: map(raw.PersonResults, getPerson)
  }
}

function getPerson(raw) {
  return {
    name: `${raw.Given} ${raw.Family}`,
    position: raw.Position,
    time: getTime(raw.Time, raw.Status),
    splits: raw.splits && getLaps(raw.splits, raw.Time)
  }
}

function getTime(totalSeconds, status = 'OK') {
  if (status === 'OK')
    return getMmSs(totalSeconds)

  if (status === 'MissingPunch')
    return 'felst'

  return status
}

function getLaps(splits, total) {
  var laps = [parseFloat(splits[0])]

  for (var i = 1; i < splits.length; i++)
    laps.push(splits[i] - splits[i - 1])

  if (total)
    laps.push(total - splits[i - 1])

  return laps
}

function getMmSs(totalSeconds) {
  var seconds = totalSeconds % 60
  var minutes = (totalSeconds - seconds) / 60
  return `${minutes}:${pad(seconds, '0')}`

  function pad(n, c) {
    return n < 10 ? c + n : n
  }
}

module.exports = calculate
