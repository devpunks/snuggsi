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

new class CustomElementRegistry {

  constructor ({ define, get, whenDefined } = customElements ) {

    window.customElements.define
      = this._define (define)
        .bind (this)
  }

  _define ( delegate = _=> {} ) {

    this.running = undefined

    //  definition = this.swizzle ( definition );

    return ( name, Class, options ) => {
      const {
      //, observedAttributes
      //, attributesChangedCallback
      //adoptedCallback
        connectedCallback
      , disconnectedCallback
      } = Class.prototype

      , definition = {
        connectedCallback
      , disconnectedCallback
      }

      console.warn ('Definining', definition, name, Class, options)

//    delegate.apply
//      ( window.customElements, this.register ( ... definition ) )
    }
  }

  register (name, Class) {
    // perhaps this goes in swizzle
    (this [name] = Class)
      .localName = name;

    ('loading' === document.readyState)
      && document.addEventListener
        ('DOMContentLoaded', function (event) { console.warn (event) } )

    return arguments
  }

  get (name) { return this [name] }
  whenDefined (name) { return (new Promise) }

  static register ( name, Class, constructor ) {
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
