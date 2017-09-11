// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// W3C - https://w3c.github.io/webcomponents/spec/custom/
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm


!!! window.customElements
  && (window.customElements = {})

new class CustomElementRegistry {

  constructor ({ define, get, whenDefined } = customElements ) {

//  const { define, get, whenDefined } = window.customElements

    this.promises = []
    this.definitions = []
    this.running = undefined

    window.customElements && (
    window.customElements.define = function (name, Class) {
      this.definitions [name] = Class

      console.warn ('Snuggs', define, this, this.definitions [name])
    }.bind (this))

//  for (let func of [define, get])
//  console.log ('Holy Shit!', func.name)
  }

  define2 (name, Class) {
  }

  get (name) {
    return this [name]
  }

  whenDefined (name) {
    console.warn ('Defined', name)

    return (new Promise)
  }

} ()


void ((registry, define = registry.define && registry.define.bind (registry)) => {
 
class CustomElementRegistry {

  static define ( name, Class, constructor ) {

//  definition = this.swizzle ( definition );

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register ( name, Class, constructor ))
  }

  static register ( name, Class, constructor ) {

    Class.localName = name

//  define && define // do not register if not custom element
//    (name, this [name] = klass)

    console.log ('the class', Class)

    return event => {
      let
        selected  =
          document.body
            .querySelectorAll (name)

      , instances = []
          .slice
          .call (selected)
          .map  (this.upgrade, Class)
    }
  }

  // http://nshipster.com/method-swizzling/
  static swizzle ( name, ... Class ) {

    return definition // tuple
  }

  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  static upgrade (element) {
    (new this)
      .connectedCallback
      .call (element)

    console.warn
      (element.localName,'ugraded!')
  }
}


registry.define =
  CustomElementRegistry.define
    .bind (CustomElementRegistry)
})

//(window.customElements = window.customElements || {})

