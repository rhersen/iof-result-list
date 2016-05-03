var forEach = require('lodash.foreach')
var map = require('lodash.map')
var min = require('lodash.min')

function calculate(raw) {
  var persons = map(raw.PersonResults, getPerson)
  var best = []

  if (persons[0] && persons[0].splits) {
    best = map(persons[0].splits, getBest)
    forEach(persons.filter(p => p.ok), p => forEach(p.splits, setBest))
  }

  return {
    name: raw.Name,
    persons: persons
  }

  function getBest(lap, i) {
    return min(map(persons, person => person.splits[i] && person.splits[i].time))
  }

  function setBest(lap, i) {
    if (lap.time === best[i])
      lap.best = true
  }
}

function getPerson(raw) {
  return {
    name: `${raw.Given} ${raw.Family}`,
    position: raw.Position,
    time: getTime(raw.Time, raw.Status),
    ok: raw.Status === 'OK' || !raw.Status,
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
  var laps = [{time: parseFloat(splits[0])}]

  for (var i = 1; i < splits.length; i++)
    laps.push({time: splits[i] - splits[i - 1]})

  if (total)
    laps.push({time: total - splits[i - 1]})

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
