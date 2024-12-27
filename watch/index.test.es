const
  assert = require('assert')
, { test, describe, beforeEach: before, afterEach: after }
  = require('node:test')
, { skip, todo } = test.it
, context = describe

//const watch = require('./index.es')

// https://nodejs.org/api/test.html#class-suitecontext
describe('watch', _=> {
  before ( _=> console.log ('Before', _) )
  after  ( _=> console.log ('After', _) )

  todo( 'Describe TODO', _=> { console.log ('WTF is going on') })

  test.it('ITTTT', _=> { assert.strictEqual(1,1) })

  test('add two numbers', _=> {
    assert ( 1+2 === 3 )
  })
})

skip( 'Describe TODO' )
todo( 'Describe TODO' )