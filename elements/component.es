// https://facebook.github.io/react/docs/react-component.html
class Component extends DocumentFragment {
  constructor () {
    return Object.assign
      (super (), { bind: this.bind })
  }

  bind (context) {
    // DOM parsing API
    // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14694#c7
    // https://w3c.github.io/DOM-Parsing
    const shadow = new Template

    const html = this.render ()

    shadow.innerHTML =
      (html.bind) ? html.innerHTML : html

//  this.append (shadow.bind (context).content)

    return this
  }

  render () { throw 'Must define `Component.render ()` function' }
}
