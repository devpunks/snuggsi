const
  { Server, Resource }
    = require ('..')

, { route }
    = require ('../middleware')

middleware = [
  route (`/hello/`, Resource `/resource/fixtures/`)
]

void
  
(new Server (middleware))
  .serve `public`
