const
  { describe, browse, serve }
    = require ('test')

const
  options = { dist: 'dist' }
, Server  = new (require ('./'))(options)

describe ('new Server', test => {

  test.doesNotThrow
    ( _ => new Server (options) )

  test.end ()
})

