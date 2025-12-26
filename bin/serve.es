//const
//{ Server, Resource }
//  = require ('../index.es')

//, { route }
//    = require ('../middleware/index.es')

//, { DIRECTORY: directory, EXAMPLES: examples }
//    = process.env

import Server from '../server/index.es'

const middleware = [
    //, route (`/hello/`, Resource `/resource/fixtures/`)
  ]

//examples && middleware.push
//  ( route (`/examples/`, Resource (examples)) )


void (new Server (middleware))
  .serve (directory)
