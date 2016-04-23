var _ = require('lodash')
require('./style.css')

function getResult(doc) {
  return _.fromPairs(_.map(doc.querySelectorAll('ClassResult'), pair))

  function pair(classResult) {
    return [
      classResult.querySelector('Class Name').textContent,
      _.map(classResult.querySelectorAll('PersonResult'), getPerson)
    ]
  }

  function getPerson(person) {
    var time = person.querySelector('Result > Time')
    var position = person.querySelector('Result > Position')
    return {
      name: _.map(['Given', 'Family'], field => person.querySelector(`Person > Name > ${field}`).textContent).join(' '),
      position: position && position.textContent,
      time: getTime(time && time.textContent, person.querySelector('Result > Status').textContent),
      splits: getSplits(person.querySelectorAll('Result > SplitTime > Time'))
    }

    function getSplits(splits) {
      var prevSeconds = 0
      return _.map(_.map(splits, 'textContent'), lapTime)

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

function ajax(callback) {
  var request = new XMLHttpRequest()
  request.open('GET', 'result.xml', true)

  request.onload = function () {
    if (this.status >= 200 && this.status < 400)
      callback(this.responseXML)
  }

  request.send()
}

ajax(responseXml => {
  var root = document.getElementById('root')

  _.map(getResult(responseXml), (persons, className) => {
    root.insertAdjacentHTML('beforeend',
      `<table>
         <caption>${className}</caption>
         <tbody>${getPersons(persons)}</tbody>
       </table>`)
  })

  function getPersons(persons) {
    return _.map(persons, getPerson).join('')
  }

  function getPerson(p) {
    return `<tr>
              <td>${p.position || ''}</td>
              <td class="name">${p.name}</td>
              ${getSplits(p.splits)}
              <td class="total">${p.time}</td>
            </tr>`
  }

  function getSplits(splits) {
    return _.map(splits, getSplit).join('')
  }

  function getSplit(split) {
    return `<td class="split">${split}</td>`
  }
})