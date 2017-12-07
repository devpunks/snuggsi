const
  tape   = require ('tape')
, server = new (require ('server'))


tape
  .onFinish ( _=> console.warn ('dest', server.destroy ()) )


module.exports = {

  test   : tape.test
, browse : require ('./browse')

, serve  :
    server
      .listen (process.env.PORT)
      .serve.bind (server)
}
