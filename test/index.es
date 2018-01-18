console.warn ('loading test helper')

const
  fetch =
    ( resource, ... options ) =>
      require ('node-fetch') (resource, ... options)

, { test, onFinish : finish }
    = require ('tape')


finish (process.exit)


module.exports = {
  test
, fetch
<<<<<<< HEAD

// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
, get    : require ('http')
, read   : require ('./read')
, serve  : require ('./serve')
, browse : require ('./browse')
=======
, read   : require ('./read')
, serve  : require ('./serve')
, browse : require ('./browse')

// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
, get    : require ('http').get
>>>>>>> Update test helper functionality
}
