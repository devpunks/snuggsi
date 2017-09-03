// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

window.customElements = ( () =>

class CustomElementRegistry {

  static define (tag, element) {

    console.log ('Snuggsi definition')

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register (tag, element))
  }

  static get registrants () {
    return registrants
  }

  static register (name, klass) {

    this.registrants [name] = klass

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

&& null

)()

