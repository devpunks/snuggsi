const
  { Server, Resource }
    = require ('..')

, { route }
    = require ('../middleware')

, { DIRECTORY: directory }
    = process.env

, middleware = [
    route (`/examples/`, Resource `/examples/`)
  , route (`/hello/`, Resource `/resource/fixtures/`)
  ]


void (new Server (middleware))
  .serve (directory)
