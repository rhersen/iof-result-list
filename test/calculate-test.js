/* eslint max-statements: 0 */

var chai = require('chai')
chai.should()

var calculate = require('../calculate')

describe('calculate', function () {
  it('returns empty persons array if input is empty object', function () {
    var result = calculate({})
    result.persons.should.be.an('array').that.is.empty
  })

  it('concatenates Given with Family', function () {
    var result = calculate({PersonResults: [{Given: 'Robert', Family: 'Robertsson'}]})
    result.persons[0].name.should.equal('Robert Robertsson')
  })

  it('passes through Position', function () {
    var result = calculate({PersonResults: [{Position: '3'}]})
    result.persons[0].position.should.equal('3')
  })

  it('converts Time from seconds to minutes', function () {
    var result = calculate({PersonResults: [{Time: '1200.0'}]})
    result.persons[0].time.should.equal('20:00')
  })

  it('converts Time from seconds to mm:ss', function () {
    var result = calculate({PersonResults: [{Status: 'OK', Time: '1222.0'}]})
    result.persons[0].time.should.equal('20:22')
  })

  it('missing punch', function () {
    var result = calculate({PersonResults: [{Status: 'MissingPunch'}]})
    result.persons[0].time.should.equal('felst')
  })

  it('calculates lap times for two splits', function () {
    var result = calculate({
      PersonResults: [{Time: '190.0', splits: ['90.0', '150.0']}]
    })
    result.persons[0].splits.should.deep.equal([90, 60, 40])
  })

  it('calculates lap times for missing punch', function () {
    var result = calculate({
      PersonResults: [{Status: 'MissingPunch', splits: ['90.0', '150.0']}]
    })
    result.persons[0].splits.should.deep.equal([90, 60])
  })
})
