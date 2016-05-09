var filter = require('lodash.filter')
var forEach = require('lodash.foreach')
var head = require('lodash.head')
var map = require('lodash.map')
var min = require('lodash.min')

function calculate(raw) {
  var persons = map(raw.PersonResults, getPerson)
  var first = head(persons)

  if (first) {
    var okPersons = filter(persons, 'ok')
    var best = map(first.splits, getBest)

    forEach(okPersons, p => forEach(p.splits, setBest))
    forEach(okPersons, setMistakes)
  }

  return {
    name: raw.Name,
    persons: persons
  }

  function getBest(lap, i) {
    return min(map(okPersons, person => person.splits[i].time))
  }

  function setBest(lap, i) {
    if (lap.time === best[i])
      lap.best = true

    lap.ratio = lap.time / best[i]
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

  function getTime(totalSeconds, status = 'OK') {
    if (status === 'OK')
      return getMmSs(totalSeconds)

    if (status === 'MissingPunch')
      return 'felst'

    return status
  }

  function getLaps(splits, total) {
    var diffs = [splits[0] - 0]

    for (var i = 1; i < splits.length; i++)
      diffs.push(splits[i] - splits[i - 1])

    if (total)
      diffs.push(total - splits[i - 1])

    return map(diffs, getLap)
  }

  function getLap(seconds) {
    return {
      time: seconds,
      mmSs: getMmSs(seconds)
    }
  }

  function getMmSs(totalSeconds) {
    var seconds = totalSeconds % 60
    var minutes = (totalSeconds - seconds) / 60

    return `${minutes}:${pad(seconds, '0')}`
  }

  function pad(n, c) {
    return n < 10 ? c + n : n
  }
}

function setMistakes(person) {
  var ratios = map(person.splits, 'ratio')
  var median = getMedian(ratios)

  forEach(person.splits, split => {
    if (split.ratio > median * 1.2)
      split.mistake = true
  })

  function getMedian(a) {
    var l = a.length

    a.sort()

    if (l % 2)
      return a[(l - 1) / 2]

    return (a[l / 2 - 1] + a[l / 2]) / 2
  }
}

module.exports = calculate
