function Template (name='') {
  const
    prototype = Object.assign
      (factory (...name).cloneNode (true), { bind })
  , content = prototype.innerHTML

  console.log ( 'wat', prototype, content)
  return prototype

  function bind (context) {
    context = // there's gotta be a better way
      (Array.isArray (context) ? context : [context])

    const
      tokens   = []
    , rendered = context
     // some weird 🐛  in cloneNode that doesn't clone deep
        .map (fragment, content) //.cloneNode (true))
        .map (collect, tokens)

    console.log ('context', context)

    this.tokens = context.map (transfer, tokens)
    console.log ('tokens', tokens)

    this.innerHTML = ''
    var content2 = document.createDocumentFragment ()
    console.log (rendered)
    rendered.forEach (frame => {
      console.log ('frame', this.content.appendChild (frame))
    })


    console.log ('rendered', rendered, content2, this.content)

    return this
  }

  function factory (name) { return (
       document.querySelector (`template[name=${name}]`)
    || document.createElement ('template')
  )}

  function fragment () { const frag = document.createElement ('template')
    frag.innerHTML = content
    console.log('fragment', frag)
    return frag.content
  }

  function collect (fragment) {
    const
      objectify = tokens =>
        tokens.reduce ((object, token) => {
          const key = token.textContent.match (/{(.+)}/) [1]
          return { [key]: token }
        }, {})

    this.push ( objectify (tokenize (fragment)))

    return fragment
  }

  function transfer (context, index) {
    for (const property in context)
      this [index][property].textContent = context [property]

    return this [index]
  }
}

//console.log ('After tokens', Template `days`.bind ({ day: 'Wakey Wakey Eggs and Bakey' }))
//console.log ('After tokens', Template `days`.bind ({ day: 'Green eggs and ham' }))
console.log ('After tokens collection', Template `days`.bind ([{ day: 'Holy' },{ day: 'Moly' }]).content)
