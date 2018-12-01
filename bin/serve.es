const
  { Server, Resource }
    = require ('..')

, { route }
    = require ('../middleware')

middleware = [
  route (`/report/`, Resource `/report/`)
, route (`/hello/`, Resource `/resource/fixtures/`)
, route (`/examples/`, Resource `/examples/`)
]

void
  
(new Server (middleware))
  .serve `public`
