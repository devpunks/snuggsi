import Element from './element.es'
import Component from './component.es'

export default class View extends Component {
  constructor (context) {
    super (context)
    console.warn (`view`, this, context)

    this.$main = new Element(`main`)
// https://developer.telerik.com/featured/w3c-vs-whatwg-html5-specs-differences-documented/
    this.$main.setAttribute (`role`, `main`)
    super.attach (this.$main)
  }

  destructor () {
    console.warn (`destructing`, this)
    if (this.$main) throw `must destruct main from memory leaks`
  }

  // mixin method
  identify (identity) {
    this.$main.setAttribute (`id`, identity)
    this.$main.setAttribute (`itemid`, identity)
    this.$main.setAttribute (`itemtype`, this.$main.localName)
  }

  attach (node) {
    this.$main.appendChild (node)

    return this
  }
}
