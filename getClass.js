var map = require('lodash.map')
var reject = require('lodash.reject')

module.exports = function ($classResult) {
  var personResults = $classResult.querySelectorAll('PersonResult')

  if (personResults.length) return {
    Id: text($classResult, 'Class > Id'),
    Name: text($classResult, 'Class > Name'),
    PersonResults: reject(map(personResults, getPerson), {Status: 'DidNotStart'})
  }

  function getPerson($person) {
    return {
      Given: text($person, 'Person > Name > Given'),
      Family: text($person, 'Person > Name > Family'),
      Position: text($person, 'Result > Position'),
      Time: text($person, 'Result > Time'),
      Status: text($person, 'Result > Status'),
      splits: map($person.querySelectorAll('Result > SplitTime > Time'), 'textContent')
    }
  }

  function text(parent, selector) {
    var element = parent.querySelector(selector)

    if (element)
      return element.textContent
  }
}

