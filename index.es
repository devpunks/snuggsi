require ('./polyfills')

//let
//  { route }
//    = require ('../middleware')

//middleware = [
//  route (`/hello/`, Resource `/resource/fixtures/`)
//, route (`/examples/`, Resource `/examples/`)
//]

module.exports = {
  Resource : require ('./resource')
, Server   : require ('./server')
}
