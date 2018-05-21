const { map } = require('./nodash')
const filter = require('lodash.filter')
const forEach = require('lodash.foreach')
const head = require('lodash.head')
const min = require('lodash.min')

function calculate(raw) {
  let best
  let okPersons
  const persons = map(raw.PersonResults, getPerson)
  const first = head(persons)

  if (first) {
    okPersons = filter(persons, 'ok')
    best = map(first.splits, getBest)

    forEach(okPersons, p => forEach(p.splits, setBest))
    forEach(okPersons, setMistakes)
  }

  return {
    name: raw.Name,
    persons: persons,
  }

  function getBest(lap, i) {
    return min(map(okPersons, person => person.splits[i].time))
  }

  function setBest(lap, i) {
    if (lap.time === best[i]) lap.best = true

    lap.ratio = lap.time / best[i]
  }
}

function getPerson(raw) {
  return {
    name: `${raw.Given} ${raw.Family}`,
    position: raw.Position,
    time: getTime(raw.Time, raw.Status),
    ok: raw.Status === 'OK' || !raw.Status,
    splits:
      raw.splits &&
      getLaps(raw.Time ? raw.splits.concat(raw.Time) : raw.splits),
  }

  function getTime(totalSeconds, status = 'OK') {
    if (status === 'OK' && totalSeconds) return getMmSs(totalSeconds)

    if (status === 'MissingPunch') return 'felst'

    return status
  }

  function getLaps(splits) {
    let prev = 0
    return map(map(splits, getDiff), getLap)

    function getDiff(current) {
      const diff = current - prev
      prev = current
      return diff
    }
  }

  function getLap(seconds) {
    return {
      time: seconds,
      mmSs: getMmSs(seconds),
    }
  }

  function getMmSs(totalSeconds) {
    const seconds = totalSeconds % 60
    const minutes = (totalSeconds - seconds) / 60

    return `${minutes}:${pad(seconds, '0')}`
  }

  function pad(n, c) {
    return n < 10 ? c + n : n
  }
}

function setMistakes(person) {
  const ratios = map(person.splits, 'ratio')
  person.median = getMedian(ratios)

  forEach(person.splits, split => {
    if (split.ratio / person.median > 1.2) split.mistake = true
  })

  function getMedian(a) {
    const l = a.length

    a.sort()

    if (l % 2) return a[(l - 1) / 2]

    return (a[l / 2 - 1] + a[l / 2]) / 2
  }
}

module.exports = calculate
