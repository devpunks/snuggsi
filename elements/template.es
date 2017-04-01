function Template ( name = `snuggsi` ) {
  return Object.assign (factory (...name), { bind })

  function bind (context) {
    context = (Array.isArray (context) ? context : [context])

    const
      tokens   = []
    , rendered = context
        .map (context => this.content.cloneNode (true))
        .map (collect, tokens)

    this.innerHTML = ''
    for (const frame of rendered) this.content.appendChild (frame)

    context.map (transfer, tokens)
    return this
  }

  function factory (name) { return (
       document.querySelector (`template[name=${name}]`).cloneNode (true)
    || document.createElement ('template')
  )}

  function collect (fragment) {
    const objectify = tokens =>
      tokens.reduce ( (object, token) =>
        (object [token.textContent.match (/{(.+)}/) [1]]  = token) && object
      , {})

    this.push (objectify (tokenize (fragment)))
    return fragment
  }

  function transfer (context, index) {
    for (const property in context) this [index]
      [property] && (this [index] [property].textContent = context [property])
  }
}
