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

let record = { name: 'That Beast' }
var collection = [
  {name: 'foo'}, {name: 'bar'},
]
window.template = new Template ('#items')

document.querySelector
  ('h1').after (
    template.bind
      (record).content
  )

let items = new Template ('#item')

items.bind (collection)

document.querySelector ('ul')
  .appendChild (items.content)

