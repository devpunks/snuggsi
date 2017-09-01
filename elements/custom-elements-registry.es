// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

class CustomElementRegistry {

  static define (tag, element) {
    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded', this.register (tag, element))
  }

  static register (name, klass) {

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
      ('ugrading element', element.localName)
  }
}

window.customElements
  =  window.customElements
  || CustomElementRegistry

