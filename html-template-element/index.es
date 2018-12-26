const Template = template => {

  let
    range = document.createRange ()

  template
    = typeof template === 'string'
    ? document.querySelector ( 'template[name=' + template + ']' )
    : template

  range.selectNodeContents ( template.content )

  let
    fragment = range.cloneContents ()

  , tokenize = (context, index) => {
      let
        clone = fragment.cloneNode (true)

      typeof context != 'object'
        && ( context  = { self: context })

      context ['#'] = index

      void (new TokenList (clone))
        .bind (context)

      return clone
    }

  , bind = context => {
      range.deleteContents ()

      context && []
        .concat (context)
        .map (tokenize)
        .reverse () // Range.insertNode does prepend
        .map (fragment => range.insertNode (fragment))
    }

  return template
}

