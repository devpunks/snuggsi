const
  server
    = (new (require ('server')))


module.exports = {

  test   : require ('tape').test
, browse : require ('./browse')

, serve  :
    server
      .listen (process.env.PORT)
      .serve.bind (server)
}
