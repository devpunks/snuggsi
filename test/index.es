const
  tape   = require ('tape')
, server = new (require ('server'))


tape
  .onFinish (_ => server.destroy ())


module.exports = {

  test   : require ('tape').test
, browse : require ('./browse')

, serve  :
    server
      .listen (process.env.PORT)
      .serve.bind (server)
}
