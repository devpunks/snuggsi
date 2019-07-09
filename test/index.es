console.warn ('loading test helper')

const
  fetch
    = ( resource, ... options ) =>
      require ('node-fetch') (resource, ... options)


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
