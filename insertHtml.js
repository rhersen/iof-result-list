var map = require('lodash.map')

var getClass = require('./getClass')

module.exports = responseXml => {
  var root = document.getElementById('root')

  root.insertAdjacentHTML('beforeend', `<h1>${getEventName(responseXml)}</h1>`)

  var $classResults = responseXml.querySelectorAll('ClassResult')

  for (var i = 0; i < $classResults.length; i++) {
    var classResult = getClass($classResults.item(i))
    
    root.insertAdjacentHTML('beforeend',
      `<table>
         <caption>${classResult.name}</caption>
         <tbody>${getPersons(classResult.persons)}</tbody>
       </table>`)
  }

  function getEventName(doc) {
    var $name = doc.querySelector('Event > Name')
    return $name && $name.textContent
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