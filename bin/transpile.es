let
  encoding  = 'UTF-8'
, { INPUT } = process.env
, contents  = require ('fs')
    .readFileSync (INPUT, encoding)

, options = {
    transforms: {
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
    require ('buble')
      .transform (contents, options)

console.log (code)
