const test = require ('test')

const
  Server  = require ('./')
, options = { dist: 'dist' }

console.warn ( (new Server (options)) )

