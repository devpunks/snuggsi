const
  { Server, Resource }
    = require ('..')

, { route }
    = require ('../middleware')

, { ROOT: root }
    = process.env

middleware = [
  route (`/hello/`, Resource `/resource/fixtures/`)
, route (`/examples/`, Resource `/examples/`)
]

void
  
(new Server (middleware))
  .serve (root)
