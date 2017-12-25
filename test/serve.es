const
  server = new (require ('server'))


require ('tape')
  .onFinish (server.shutdown)

module.exports
  = server.serve.bind (server)
