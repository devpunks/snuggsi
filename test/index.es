console.warn ('loading test helper')


module.exports = {
  serve  : require ('./serve')
, browse : require ('./browse')

// See chunked responses
// http://taylor.fausak.me/2013/02/17/testing-a-node-js-http-server-with-mocha/
, get    : require ('http').get
, test   : require ('tape').test
, open   :
}
