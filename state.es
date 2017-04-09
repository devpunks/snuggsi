function State

  // https://en.wikipedia.org/wiki/Immutable_object
  // https://en.wikipedia.org/wiki/Persistent_data_structure

( context, history = [context], handler = _ => {} ) {
  this.subscribe = callback => handler = callback

  const
    clone = context => JSON.parse
      (JSON.stringify (context))

  , describe = property =>
      {
        enumerable: true

      , get: _ => history
          [history.length-1] [property]

      , set (value) {
          const next  = clone
            (previous = history [history.length-1])

          next [property] = value
          handler (previous, next)
          history [history.length] = next
        }
      }

  for (property in context)
    Object.defineProperty
      // http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.6
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
      (this, property, describe (property))
}
