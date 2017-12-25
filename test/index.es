console.warn ('loading test helper')

const
  tape   = require ('tape')
, server = new (require ('server'))


tape.onFinish ( server.shutdown )


module.exports = {

  test   : tape.test
, browse : require ('./browse')

, serve  : server.serve.bind (server)
}
