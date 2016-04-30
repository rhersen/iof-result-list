var chai = require('chai')
chai.should()

var calculate = require('../calculate')

describe('calculate', function () {
  it('empty', function () {
    var result = calculate({})
    result.persons.should.be.an('array').that.is.empty
  })
})
