// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

class CustomElementRegistry {

  static define (tag, element) {
    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded', this.upgrade (tag))
  }

  static upgrade (tag) {
    return event =>
      console.log ('Defined bitch', tag, this, event)
  }
}

window.customElements
  = window.customElements
  || CustomElementRegistry

