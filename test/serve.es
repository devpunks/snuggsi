const
  server = new (require ('server'))


require ('tape')
  .onFinish (process.exit)

module.exports
  = server.serve.bind (server)
