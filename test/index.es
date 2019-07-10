console.warn ('loading test helper')

const
  fetch
    = ( resource, ... options ) =>
      require ('node-fetch') (resource, ... options)

, sleep = time => new Promise
    (alarm => setTimeout (alarm, time))

, zip = ( tokens, result = '' ) =>
    [
      (result, fragment) =>
        result += `${ fragment }${ tokens.shift `` || `` }`
    , result
    ]


class Test {
  constructor (name) {
    console.warn ('Test Name', name)

    return group =>
      require ('tape') (name, Case (group))
  }
}


function test (fragments, ...tokens) {
  let
    name =
      [ ]
      //.flat   ( ) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        .concat ( fragments )
        .reduce ( ... zip (tokens) )

  return callback =>
    new Test (name) (callback)
}

function Case (definition) {
  let result, funk = async function (t) {
    let { assert } = t
    let assertions = []

    let ass = function (predicate) {
      assertions.push ( _ => assert (predicate))

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


module.exports = {
    test
//, fetch

// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
, get    : require ('http')
//, read   : require ('./read')
//, serve  : require ('./serve')
//, browse : require ('./browse')
}
