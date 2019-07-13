console.warn ('loading test helper')

const
  test = require ('tape')

// test.onFinish (process.exit)

const
  sleep = time =>
    new Promise (alarm => setTimeout (alarm, time))

, zip = ( tokens, result = '' ) =>
    [
      (result, fragment) => result
        += `${ fragment }${ tokens.shift `` || `` }`
    , result
    ]


class Test {

  constructor (fragments, ...tokens) {
    let name = [ ]
    //.flat   ( ) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
      .concat ( fragments )
      .reduce ( ... zip (tokens) )

    return group => {
      return test (name, Case (group))
    }
  }
}

function Case (definition) {
  let
    result

  return async function (t) {
    let { assert } = t
    let assertions = []

    let assertion = function (predicate) {
      assertions.push ( _ => assert ( predicate ) )

      return ass
    }

    typeof definition
      === 'function'
        ? await definition (ass)
        : ass (definition)

    t.plan (assertions.length) // prevents t.end calls

    for (let operation of [ ... assertions ])
      operation ``
  }

  return funk // definition
}


module.exports =
    ( ... params ) => callback =>
      new Test ( ... params ) (callback)

void {
// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
//, get    : require ('http')
//, browse : require ('./browse')
}
