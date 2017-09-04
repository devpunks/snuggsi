// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

((registry, define = registry.define && registry.define.bind (registry)) => {
 
class CustomElementRegistry {

  static define (name, ... klass) {

    console.warn ('Snuggsi', name, klass);

    klass = this.swizzle (klass);

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register (name, klass))
  }

  static register (name, klass) {

    define && define // do not register if not custom element
      (name, this [name] = klass)

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

  static swizzle (klass, constructor = HTMLCustomElement) {
    console.log ('Im swizzlin!')

    console.warn ('Element', klass)
    console.warn ('Element.prototype', klass.prototype)
    console.warn ('Element.prototype.constructor', klass.prototype.constructor)
    console.warn ('Element.constructor', klass.constructor)
    console.warn ('constructor', constructor)
    console.warn ('constructor.prototype', constructor.prototype)

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

