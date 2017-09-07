// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// W3C - https://w3c.github.io/webcomponents/spec/custom/
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm

((registry, define = registry.define && registry.define.bind (registry)) => {
 
class CustomElementRegistry {

  static define ( ... definition ) {

//  definition = this.swizzle ( definition );

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded',
          this.register ( ... definition ))
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

(window.customElements = window.customElements || {})

