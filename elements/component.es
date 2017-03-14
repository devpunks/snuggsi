// https://facebook.github.io/react/docs/react-component.html
class Component  extends DocumentFragment {
  constructor () { super () }

  bind (context) {
    // DOM parsing API
    // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14694#c7
    // https://w3c.github.io/DOM-Parsing
    const shadow = new Template

    const html = this.render ()

    shadow.innerHTML =
      (html.bind) ? html.innerHTML : html

    this.append (shadow.bind (context).content)

    return this
  }

  render () { throw 'Must define `Component.render ()` function' }
}

class Greeter extends Component {
  render () { return  `<h1>{name}</h1>` }
}

const names = [{name:'snuggs'}, {name:'dees'}]

const greeter = (new Greeter).bind (names)

document.body.append (greeter)

