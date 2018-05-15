module.exports = function($classResult) {
  const personResults = $classResult.querySelectorAll('PersonResult')

  if (personResults.length)
    return {
      Id: text($classResult, 'Class > Id'),
      Name: text($classResult, 'Class > Name'),
      PersonResults: Array.prototype.filter.call(
        Array.prototype.map.call(personResults, getPerson),
        person => person.Status !== 'DidNotStart'
      ),
    }

  function getPerson($person) {
    return {
      Given: text($person, 'Person > Name > Given'),
      Family: text($person, 'Person > Name > Family'),
      Position: text($person, 'Result > Position'),
      Time: text($person, 'Result > Time'),
      Status: text($person, 'Result > Status'),
      splits: Array.prototype.map.call(
        $person.querySelectorAll('Result > SplitTime > Time'),
        time => time.textContent
      ),
    }
  }

  function text(parent, selector) {
    const element = parent.querySelector(selector)

    if (element) return element.textContent
  }
}
