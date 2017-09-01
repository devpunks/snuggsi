// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

class CustomElementRegistry {

  static define (tag, element) {
    console.warn ('WHAT THE FUCK THIS WORKED FOR IE!!!!')
    console.warn ('tag:', tag)
    console.warn ('class definition:', element)
  }
}

window.customElements
  = window.customElements
  || CustomElementRegistry

