const
  assert = require('assert')
, { test, describe, beforeEach: before, afterEach: after }
  = require('node:test')
, { skip, todo } = test.it
, context = describe

// https://nodejs.org/api/test.html#class-suitecontext
describe ('TokenList', _=> {
  let
    node = {}
  , result = 1 + 2

  test ('adds two numbers', _=> {
    assert (result === 3)
  }) // test

  context.todo ('Lexer', _=> {
    test ('tokenization')
  }) // context

  context.todo ('Parser', _=> {
    test ('syntax')
  }) // context

  describe.todo ('.bind', _=> {
    test ('binding')
  }) // describe
}) // describe

