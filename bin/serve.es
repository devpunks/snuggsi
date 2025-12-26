//const
//{ Server, Resource }
//  = require ('../index.es')

, { route }
    = require ('../middleware/index.es')

, { DIRECTORY: directory, EXAMPLES: examples }
    = process.env

, middleware = [
    //, route (`/hello/`, Resource `/resource/fixtures/`)
  ]

console.log ('bin/serve SNUGGSI', Object.keys(require ('..')))
console.log ('SNUGGSI', process.env.SNUGGSI)

//examples && middkeware.push
//  ( route (`/examples/`, Resource (examples)) )


void (new Server (middleware))
  .serve (directory)
