/* eslint max-statements: 0 */

var chai = require('chai')
var expect = chai.expect

var calculate = require('../calculate')

describe('calculate', function () {
  it('returns empty persons array if input is empty object', function () {
    var result = calculate({})
    expect(result.persons).to.be.an('array').that.is.empty
  })

  it('concatenates Given with Family', function () {
    var result = calculate({PersonResults: [{Given: 'Robert', Family: 'Robertsson'}]})
    expect(result.persons[0].name).to.equal('Robert Robertsson')
  })

  it('passes through Position', function () {
    var result = calculate({PersonResults: [{Position: '3'}]})
    expect(result.persons[0].position).to.equal('3')
  })

  it('converts Time from seconds to minutes', function () {
    var result = calculate({PersonResults: [{Time: '1200.0'}]})
    expect(result.persons[0].time).to.equal('20:00')
  })

  it('converts Time from seconds to mm:ss', function () {
    var result = calculate({PersonResults: [{Status: 'OK', Time: '1222.0'}]})
    expect(result.persons[0].time).to.equal('20:22')
  })

  it('missing punch', function () {
    var result = calculate({PersonResults: [{Status: 'MissingPunch'}]})
    expect(result.persons[0].time).to.equal('felst')
  })

  it('calculates lap times for two splits', function () {
    var result = calculate({
      PersonResults: [{Time: '190.0', splits: ['90.0', '150.0']}]
    })
    expect(result.persons[0].splits[0].time).to.equal(90)
    expect(result.persons[0].splits[1].time).to.equal(60)
    expect(result.persons[0].splits[2].time).to.equal(40)
  })

  it('calculates best lap times', function () {
    var result = calculate({
      PersonResults: [
        {Time: '190.0', splits: ['90.0', '151.0']},
        {Time: '190.0', splits: ['91.0', '150.0']}]
    })
    expect(result.persons[0].splits[0].time).to.equal(90)
    expect(result.persons[0].splits[0].best).to.be.ok
    expect(result.persons[0].splits[0].ratio).to.equal(1)
    expect(result.persons[0].splits[1].time).to.equal(61)
    expect(result.persons[0].splits[1].best).to.not.be.ok
    expect(result.persons[0].splits[1].ratio).to.be.gt(1)
    expect(result.persons[0].splits[2].time).to.equal(39)
    expect(result.persons[0].splits[2].best).to.be.ok
    expect(result.persons[1].splits[0].time).to.equal(91)
    expect(result.persons[1].splits[0].best).to.not.be.ok
    expect(result.persons[1].splits[1].time).to.equal(59)
    expect(result.persons[1].splits[1].best).to.be.ok
    expect(result.persons[1].splits[2].time).to.equal(40)
    expect(result.persons[1].splits[2].best).to.not.be.ok
  })

  it('calculates mistakes', function () {
    var result = calculate({
      PersonResults: [
        {Time: '310.0', splits: ['110.0', '210.0']},
        {Time: '330.0', splits: ['100.0', '230.0']}]
    })
    expect(result.persons[0].splits[0].time).to.equal(110)
    expect(result.persons[0].splits[0].ratio).to.equal(1.1)
    expect(result.persons[0].splits[0].mistake).to.not.be.ok
    expect(result.persons[0].splits[1].time).to.equal(100)
    expect(result.persons[0].splits[1].ratio).to.equal(1)
    expect(result.persons[0].splits[1].mistake).to.not.be.ok
    expect(result.persons[0].splits[2].time).to.equal(100)
    expect(result.persons[0].splits[2].ratio).to.equal(1)
    expect(result.persons[0].splits[2].mistake).to.not.be.ok
    expect(result.persons[1].splits[0].time).to.equal(100)
    expect(result.persons[1].splits[0].ratio).to.equal(1)
    expect(result.persons[1].splits[0].mistake).to.not.be.ok
    expect(result.persons[1].splits[1].time).to.equal(130)
    expect(result.persons[1].splits[1].ratio).to.equal(1.3)
    expect(result.persons[1].splits[1].mistake).to.be.ok
    expect(result.persons[1].splits[2].time).to.equal(100)
    expect(result.persons[1].splits[2].ratio).to.equal(1)
    expect(result.persons[1].splits[2].mistake).to.not.be.ok
  })

  it('calculates lap times for missing punch', function () {
    var result = calculate({
      PersonResults: [
        {Time: '190.0', splits: ['90.0', '151.0']},
        {Status: 'MissingPunch', splits: ['90.0', '150.0']}]
    })
    expect(result.persons[1].splits[0].time).to.equal(90)
    expect(result.persons[1].splits[0].best).to.not.be.ok
    expect(result.persons[1].splits[1].time).to.equal(60)
    expect(result.persons[1].splits[1].best).to.not.be.ok
  })
})
