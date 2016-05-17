/* eslint max-statements: 0 */

var chai = require('chai')
var expect = chai.expect

var splitStyle = require('../splitStyle')

describe('splitStyle', function () {
  it('best', function () {
    var result = splitStyle({ratio: 0.5}, 1)
    expect(result).to.equal('background-color: rgb(128,255,128)')
  })

  it('good', function () {
    var result = splitStyle({ratio: 0.9}, 1)
    expect(result).to.equal('background-color: rgb(230,255,230)')
  })

  it('small mistake', function () {
    var result = splitStyle({ratio: 2}, 1.8)
    expect(result).to.equal('background-color: rgb(255,255,127)')
  })

  it('less small mistake', function () {
    var result = splitStyle({ratio: 2}, 1.799)
    expect(result).to.equal('background-color: rgb(255,255,127)')
  })

  it('mistake', function () {
    var result = splitStyle({ratio: 2}, 1.6)
    expect(result).to.equal('background-color: rgb(255,227,127)')
  })

  it('big mistake', function () {
    var result = splitStyle({ratio: 2}, 1.4)
    expect(result).to.equal('background-color: rgb(255,199,127)')
  })

  it('normal', function () {
    var result = splitStyle({ratio: 1}, 1)
    expect(result).to.equal('background-color: rgb(255,255,255)')
  })

  it('almost normal', function () {
    var result = splitStyle({ratio: 1}, 1.001)
    expect(result).to.equal('background-color: rgb(255,255,255)')
  })
})
