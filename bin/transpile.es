var
  encoding = 'UTF-8'
  buble    = require ('buble')
, contents = require('fs').readFileSync
    ('./dist/snuggsi.es', encoding)

, options = {
    transforms: {
      arrow: true,
      modules: false,
      dangerousForOf: true,
      templateString: false,
      reservedProperties: true
    },

    // prevent function expressions generated from class methods
    // from being given names – needed to prevent scope leak in IE8
    namedFunctionExpressions: false
  }

, result = buble.transform
    (contents, options)

console.log (result.code)
