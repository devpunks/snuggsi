// https://facebook.github.io/react/docs/react-component.html
class Component  extends DocumentFragment {
  constructor (context) { super () }

  bind (context) {
    const template = this.render ()
    // DOM parsing API
    // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14694#c7
    // https://w3c.github.io/DOM-Parsing
    this.innerHTML =
      (template instanceof HTMLTemplateElement)
        ? template.bind (context).innerHTML
        : tag (template, context)

    return this
  }

  render () { throw 'Must define `Component.render ()` function' }
}

const component = (new Component)
  .bind ({name:'foo', id: 124})

console.dir (component)
document.body
  .appendChild (component)

