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

  bind (state) {
    let html   = window.template = this.innerHTML
    let render = context => tag (html) (context)

    let tags = Array.isArray (state)
      ?  state.map (render)
      : [render (state)]

    this.innerHTML = tags.join ('')

    return this
  }
}

let record = { name: 'That Beast' }
var collection = [
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
{name: 'foo'}, {name: 'bar'},
]
console.group ('template')
console.time ('bind time')
window.template = new Template ('#items')

document.
  body.appendChild
  (
    (new Template ('#items'))
      .bind(record)
      .content
  )

let items = new Template ('#item')

items
  .bind (collection)

let ul = document.querySelector ('ul')

ul.appendChild (items.content)

console.timeEnd ('bind time')
console.groupEnd ('template')

console.group ('appendChild')
console.time ('append time')
for (let context of collection) {
  let li = document.createElement ('li')
  ul.appendChild (li)
  li.outerHTML = `<li style='background:red'>Hello ${context.name}!</li>`
}
console.timeEnd ('append time')
console.groupEnd ('appendChild')
