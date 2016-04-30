var map = require('lodash.map')
var forEach = require('lodash.foreach')

var getClass = require('./getClass')
var calculate = require('./calculate')

module.exports = responseXml => {
  var root = document.getElementById('root')

  root.insertAdjacentHTML('beforeend', `<h1>${getEventName(responseXml)}</h1>`)

  forEach(responseXml.querySelectorAll('ClassResult'), classDom => {
    root.insertAdjacentHTML('beforeend', classHtml(calculate(getClass(classDom))))
  })

  function getEventName(doc) {
    var $name = doc.querySelector('Event > Name')
    return $name && $name.textContent
  }

  function classHtml(classResult) {
    return `<table>
              <caption>${classResult.name}</caption>
              <tbody>${getPersons(classResult.persons)}</tbody>
            </table>`
  }

  function getPersons(persons) {
    return map(persons, getPerson).join('')

    function getPerson(p) {
      return `<tr>
                <td>${p.position || ''}</td>
                <td class="name">${p.name}</td>
                ${getSplits(p.splits)}
                <td class="total">${p.time}</td>
              </tr>`

      function getSplits(splits) {
        return map(splits, getSplit).join('')

        function getSplit(split) {
          return `<td class="split">${split}</td>`
        }
      }
    }
  }
}