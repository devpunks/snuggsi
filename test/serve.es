const
  server = new (require ('server'))


module.exports
  = server.serve.bind (server)
