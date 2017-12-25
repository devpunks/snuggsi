console.warn ('loading test helper')

module.exports = {

  test   : tape.test
, browse : require ('./browse')

, serve  : server.serve.bind (server)
}
