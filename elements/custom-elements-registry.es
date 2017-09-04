// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

((registry, define = registry.define && registry.define.bind (registry)) => {
 
class CustomElementRegistry {

  static define (name, ... klass) {

    klass = this.swizzle ( ... klass );

    console.warn ('Snuggsi', name, klass);

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register (name, klass))
  }

  static register (name, klass) {

//  define && define // do not register if not custom element
//    (name, this [name] = klass)

    return event => {

      let
        selected  =
          document.body
            .querySelectorAll (name)

      , instances = []
          .slice
          .call (selected)
          .map  (this.upgrade)
    }
  }

  // http://nshipster.com/method-swizzling/
  static swizzle (klass) {

    console.warn ('html element', HTMLElement)
//  class CustomHTMLElement extends HTMLElement {
//    constructor () { super ()
//      Object.setPrototypeOf (this, klass)
//      console.log ('proto', this.__proto__)
//      this.__proto__ = HTMLElement
//      console.log ('proto', this.__proto__)
//    }

//    connectedCallback () {
//      console.dir (this)
//      console.dir (klass.prototype.connectedCallback)
//    }
//  }

    return klass
  }

  static upgrade (element) {
    console.log
      ('ugrading element',
       element.localName)
  }
}


registry.define =
  CustomElementRegistry.define
    .bind (CustomElementRegistry)
})

(window.customElements = window.customElements || {})

