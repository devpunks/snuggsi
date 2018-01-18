const
  { test, fetch }
    = require ('test')

, { Server }
    = require ('..')


console.warn ((new Server).serve)

test.only ('calling next middleware')


test ('Content-Security-Policy', async t => {

  const
    server   = (new Server).serve ``
  , response = await fetch ('http://localhost:8181/')


  t.ok (response.headers)

  server.close ``
  t.end ()
})
