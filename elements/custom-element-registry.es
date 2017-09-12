!!! window.customElements
  && (window.customElements = {/* microfill */})

// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// The Custom Elements Spec
// W3C - https://w3c.github.io/webcomponents/spec/custom/
// WHATWG- https://html.spec.whatwg.org/multipage/custom-elements.htm
//
// Legacy webcomponentsjs
//   - https://github.com/webcomponents/custom-elements/blob/master/src/CustomElementRegistry.js
//
//   - CEReactions
//     - https://github.com/webcomponents/custom-elements/pull/62
//     - https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions
//     - https://html.spec.whatwg.org/#cereactions

new class CustomElementRegistry {

  constructor ({ define, get, whenDefined } = customElements ) {

    window.customElements.define
      = this._define (define)
        .bind (this)
  }

  _define ( delegate = _=> {} ) {

    this.running = undefined

    //  definition = this.swizzle ( definition );

    return ( name, constructor, options ) => {
      console.warn ('Definining', name, constructor, options)

      void (_=>{}).apply
        ( window.customElements, this.register ( name, constructor ) )
    }
  }

  register (name, Class) {
    // perhaps this goes in swizzle
    (this [name] = Class)
      .localName = name;

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded', this.queue ( ... arguments ))

    return arguments
  }

  queue ( name, Class, constructor ) {
    return event => {
      let
        selected  =
          document.body
            .querySelectorAll (name)

      , instances = []
          .slice
          .call (selected)
          // .reverse () // should be able to do depth first
          .map  (this.upgrade (Class))
    }
  }

  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (constructor) {
    return function (element) {

      Object
        .setPrototypeOf
          (element, Object.create (constructor.prototype))
        .initialize ()
        .connectedCallback ()
    }
  }

  // http://nshipster.com/method-swizzling/
  static swizzle ( name, ... Class ) {

    return definition // tuple
  }
}
