class Template {
  constructor (selector) {
    return Object.assign (
      this.factory (selector),
      { bind: this.bind }
    )
  }

  factory (selector) {
    return (
      document.querySelector (selector)
        || document.createElement ('template')
    ).cloneNode (true)
  }

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

document.
  body.appendChild
  (
    template
      .bind(record)
      .content
  )

let items = new Template ('#item')

items.bind (collection)

document.querySelector ('ul')
  .appendChild (items.content)

