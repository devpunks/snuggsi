const
  server
    = (new (require ('server')))

module.exports = {
  test   : require ('tape').test
, browse : require ('./browse')

, serve  :
    server
      .listen (3002)
      .serve.bind (server)
}
