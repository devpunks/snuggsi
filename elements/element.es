// Usage
//
//  Element `date-calendar`
//  (class extends HTMLElement {
//    constructor () {
//      super ()
//      console.log ('Goin in context', this.context)
//    }
//
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

  // determines if function object
  tag = tag.raw [0]

  return function (prototype) {
    if (! prototype)
      try { return new (window.customElements.get (tag)) }
      catch (_) { throw `Must register custom element \n(i.e. Element \`${tag}\` (class {})` }

    class HTMLElementPrototype extends prototype {
      bind (context) { this.context = context }

      get context () { return { what: 'No way!' } }

      connectedCallback () { console.warn (`connected`, this) }
      // custom element reactions

      // only trigger attribute changes for the following properties
      static get observedAttributes () { return [`id`] }
      attributeChangedCallback (name, old, value) {
        console.warn (`attribute [${name}] changed from ${old} to ${value}`)
      }

      // When element is removed from a shadow-including document
      // http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
      disconnectedCallback () { // detach event listeners added on attached
        console.warn (`disconnected`, this)
      }

      adoptedCallback () { console.warn (`adopted this`, this) }
    }

    try { window.customElements.define (tag, HTMLElementPrototype) }
    finally { return window.customElements.get (tag) }
  }
}

// Assign `window.Element.prototype`
// in case of feature checking on `Element`
// https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
Element.prototype = window.Element.prototype

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
