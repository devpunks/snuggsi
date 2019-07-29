let
  encoding  = 'UTF-8'

, { INPUT }
    = process.env

, { readFileSync: read }
    = require ('fs')

, options = {
    // prevent function expressions generated from class methods from being given names – needed to prevent scope leak in IE8
    namedFunctionExpressions: false

  , transforms: {
      arrow: true
    , modules: false
    , dangerousForOf: true
    , templateString: false
    , reservedProperties: true
    }
    // prevent function expressions generated from class methods
    // from being given names – needed to prevent scope leak in IE8
  , namedFunctionExpressions: false
  }

, { code } =
    require ('buble').transform
      ( read (INPUT, encoding) , options)

console.log (code)
