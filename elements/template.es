class Template {
  constructor (id) {
    return Object.assign (
      this.factory (id),
      { bind: this.bind }
    )
  }

  factory (id) {
    return (
      document.getElementById (id)
      || document.createElement ('template')
    ).cloneNode (true)
  }

  // investigate `Text.splitText ()`
  // Recurse through elements and bind event handlers
  // https://developer.mozilla.org/en-US/docs/Web/API/Text/splitText
  bind (context) {
    let html   = this.innerHTML
      , render = context => tag (html) (context)

      , tags = Array.isArray (context)
          ?  context.map (render)
          : [render (context)]

    this.innerHTML = tags.join ('')

    return this
  }
}
