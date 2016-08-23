var classnames = require('classnames')
var map = require('lodash.map')
var forEach = require('lodash.foreach')

var getClass = require('./getClass')
var calculate = require('./calculate')
var style = require('./splitStyle')

module.exports = responseXml => {
  var root = document.getElementById('root')
  var hasId = /\?(\d+)/.exec(document.location.search)
  var id = hasId && hasId[1]

  if (!hasId)
    root.insertAdjacentHTML('beforeend', `<h1>${getEventName(responseXml)}</h1>`)

  forEach(responseXml.querySelectorAll('ClassResult'), classDom => {
    var cls = getClass(classDom)

    if (!cls)
      return

    if (!hasId)
      root.insertAdjacentHTML('beforeend', ` <a href="?${cls.Id}">${cls.Name}</a>`)
    else if (cls.Id === id)
      root.insertAdjacentHTML('beforeend', classHtml(calculate(cls)))
  })
}

function getEventName(doc) {
  var $name = doc.querySelector('Event > Name')
  return $name && $name.textContent
}

function classHtml(classResult) {
  return `<h1>${classResult.name}<a href="?">Välj annan klass</a></h1>
          <table>
            <colgroup>
              <col class="position" />
              <col class="name" />
            </colgroup>
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
        var classNames = {split: true, best: split.best, mistake: split.mistake}
        return `<td class="split" style="${style(split, p.median)}">${split.mmSs}</td>`
      }
    }
  }
}
