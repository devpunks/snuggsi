// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

class CustomElementRegistry {

  define (tag, constructor) {
    console.warn ('WHAT THE FUCK THIS WORKED FOR IE!!!!')
    console.warn ('tag:', tag)
    console.warn ('class definition:', constructor)
  }
}

// WHATWG Custom Elements Spec - https://html.spec.whatwg.org/multipage/custom-elements.htm

window.customElements
  = window.customElements
  || CustomElementRegistry

void (new window.customElements).define ('foo-bar')
