var map = require('lodash.map')

module.exports = function ($classResult) {
  var personResults = map($classResult.querySelectorAll('PersonResult'), getPerson)

  return {
    Name: getTextContent($classResult, 'Class > Name'),
    PersonResults: personResults.filter(p => p.Status !== 'DidNotStart')
  }

  function getPerson($person) {
    return {
      Given: getTextContent($person, 'Person > Name > Given'),
      Family: getTextContent($person, 'Person > Name > Family'),
      Position: getTextContent($person, 'Result > Position'),
      Time: getTextContent($person, 'Result > Time'),
      Status: getTextContent($person, 'Result > Status'),
      splits: map($person.querySelectorAll('Result > SplitTime > Time'), 'textContent')
    }
  }

  function getTextContent(parent, selector) {
    var element = parent.querySelector(selector)
    return element ? element.textContent : ' '
  }
}

