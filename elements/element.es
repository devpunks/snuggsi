// Usage
//
//  Element `date-calendar`

//  (class extends HTMLElement {
//    constructor () {
//      super ()
//      console.log ('Goin in context', this.context)
//      this.listen ('click', (event) => console.log (event))
//    }

//    connectedCallback () {
//      console.log ('from derived connected')
//    }

//    get baz () { return 'baz' }
//  })


// Custom elements polyfill
// https://github.com/webcomponents/custom-elements/blob/master/src/custom-elements.js
// Function.name - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name#Examples
// https://developer.mozilla.org/en-US/docs/Web/API/Element
// https://developer.mozilla.org/en-US/docs/Web/API/Element/name

//https://gist.github.com/allenwb/53927e46b31564168a1d

var ElementPrototype = window.Element.prototype

const Element = function (tag, ...tokens) {
  if (this instanceof Element) return new self.Element

  // tag = tag.raw [0] for HTML Sanitization?

  return function (pro) {
    if (! pro)
      try { return new (window.customElements.get (tag)) }
      catch (_) { throw `Must define custom element \n(i.e. Element \`${tag}\` (class {})` }

    function proto () { // Kill this with fire
      pro.__proto__ = HTMLElement // WTF?

      return ~ (pro.__proto__.name.toString ().search (/^HTML(.*)Element$/))
        ? pro : HTMLElement
    }

    class CustomElementPrototype extends pro {
      listen (...params) {
        console.log (...params)
        this.addEventListener (...params)
      }

      bind (context) {
        this [Symbol.species] = new Context (context)
        this.append
          (new Template (tag).bind (this [Symbol.species]).content)
      }

      get context () { return this [Symbol.species] }

      // custom element reactions

      static get observedAttributes () { return [`id`] }
      attributeChangedCallback (name, old, value) {
        console.warn (`attribute [${name}] changed from ${old} to ${value}`)
      }

      connectedCallback () {
        super.connectedCallback ()
        console.warn (`connected`, this)
      }

      // When element is removed from a shadow-including document
      // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
      disconnectedCallback () {
       // detach event listeners added on attached
        console.warn (`disconnected`, this)
      }

      adoptedCallback () { console.warn (`adopted this`, this) }
    }

    try { window.customElements.define (tag, CustomElementPrototype) }
    finally { return window.customElements.get (tag) }
  }
}

// Assign `window.Element.prototype`
// in case of feature checking on `Element`
// https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
Element.prototype = window.Element.prototype


//var render = function () { console.log ('HOLY FUCK THIS WORKED!!!') }

Element `date-calendar`

(class extends HTMLElement {
  constructor () {
    super ()

    this.bind ({ foo: 'bar', name: this.baz })
    this.listen ('click', (event) => console.log (event))
  }

  connectedCallback () { console.log ('from derived connected') }

  get baz () { return 'baz' }
})

//Element
//(Element)
//(Element) `data-calendar`
//(Element `data-calendar`)
//Element (`data-calendar`)
//Element ('data-calendar')

//new Element
//(new Element)
//new (Element`date-calendar`)
//(new Element) `date-calendar`
//(new Element `date-calendar`)
//new (Element `date-calendar`)
//new Element (`date-calendar`)
