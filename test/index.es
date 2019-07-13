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

  constructor ( name ) {
    (this.test = test ())
      .comment (this.name = name)

    return  (this).case
     .bind (this)
  }

  async 'case' (definition) {
    let { test: { assert, end }} = this

    let assertions = []
    let assertion = ( ... parameters ) =>
      assertions
        .push ( _ => assert ( ... parameters ) )
      && assertion

//  ONLY USE TERNARIES WHEN RETURN VALUE IS OF IMPORTANCE
//  typeof definition === 'function'
//    ? await definition ( assertion )
//    : assertion ( definition )

    typeof definition
      == 'function'
      && await definition (assertion)


    console.warn ('ASSERTIONS!!!', assertions)

    for ( let operation of assertions )
      operation ``

    end ()
  }
}


class Case {

//    console.warn ('Plan', t.plan)
////  t.plan ( assertions.length ) // prevents t.end calls
////    : queue (definition)

//    assertions.push (t.end)

//    for ( let operation of assertions )
//      operation ``
//  }
}


module.exports = ( ... name ) =>
  new Test ( christen (name) )

void {
// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
//, get    : require ('http')
//, browse : require ('./browse')
}
