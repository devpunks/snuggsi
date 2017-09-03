// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

((registry, define = registry.define.bind (registry)) => {
 
class CustomElementRegistry {

  static define (name, klass, constructor) {

    console.warn ('Snuggsi', name, constructor, klass);

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register (name, klass))
  }

  static register (name, klass) {

    this [name] = klass

    define &&
      define (name, this [name])

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

