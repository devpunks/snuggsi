const Template = function ( name = 'snuggsi' ) {
  return Object.assign (factory (...name), { bind })

  function bind (context) {
    context = (Array.isArray (context) ? context : [context])

//  const
//    tokens   = []
//  , rendered = context
//      .map (context => this.content.cloneNode (true))
//      .map (collect, tokens)

//  this.innerHTML = ''
//  for (const frame of rendered) this.content.appendChild (frame)

//  return context.map(transfer, tokens) && this
  }

  function factory (name) {
    return (
       document.querySelector ('template[name='+name+']').cloneNode (true)
    || document.createElement ('template')
  )}
}
