console.warn ('loading test helper')

const
  test = require ('tape')

// test.onFinish (process.exit)

const
  // TODO: migrate to ./index
  sleep = time =>
    new Promise (alarm => setTimeout (alarm, time))

const
  zip = ( tokens, result = '' ) =>
    [
      (result, fragment) => result
        += `${ fragment }${ tokens.shift `` || `` }`
    , result
    ]

, christen = ( fragments, ... tokens ) =>
    [ ]
    //.flat   ( ) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
      .concat ( fragments ) // Satisfy atomic string and tag templating
      .reduce ( ... zip (tokens) )


class Test {

  constructor ( ... name ) {
    function normalize (definition) {
      console.warn (typeof definition)
      console.warn ('Normie', definition)

      return definition
    }

    return this.define.bind (this)
  }

  define (definition) {
    let test =
    require ('tape') (
      this.name
    , this.definition = definition )

      console.warn ('Test After', test)
    }
//    super ( this.christen (name), this.case )
  }

  async 'case' (t) {
    let { assert } = t
    let assertions = []

    t.assert (true)
    t.end ()
  }

  christen ( fragments, ... tokens ) {
    return [ ]
    //.flat   ( ) // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
      .concat ( fragments ) // Satisfy atomic string and tag templating
      .reduce ( ... zip (tokens) )
  }
}


class Case {

//    let assertion = function (predicate) {
//      assertions.push ( _ => assert ( predicate ) )

//      return assertion
//    }

//    typeof definition === 'function'
//      ? await definition ( assertion )
//      : assertion ( definition )

//    console.warn ('Plan', t.plan)
////  t.plan ( assertions.length ) // prevents t.end calls
////    : queue (definition)

//    assertions.push (t.end)

//    for ( let operation of assertions )
//      operation ``
//  }
}


module.exports =
  ( ... name ) =>
    definition => new Test
      ( name, definition )

void {
// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
//, get    : require ('http')
//, browse : require ('./browse')
}
