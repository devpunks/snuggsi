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

  async 'case' (definition, ... options) {
    let
      { test: { assert, end }} = this

    , assertions = []
    , assertion  = ( ... parameters ) => {
      assert ( ... parameters )
      return assertion
    }

//  ONLY USE TERNARIES WHEN RETURN VALUE IS OF IMPORTANCE
//  typeof definition === 'function'
//    ? await definition ( assertion )
//    : assertion ( definition )

    typeof definition
      === 'function'
        ? await definition (assertion)
        : assert (definition, ... options)

    end ()
  }
}

module.exports = ( ... name ) =>
  new Test ( christen (name) )

void {
// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
//, get    : require ('http')
//, browse : require ('./browse')
}
