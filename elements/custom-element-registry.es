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
      const {
        //, observedAttributes
        //, attributesChangedCallback
        //, adoptedCallback
          connectedCallback
        , disconnectedCallback
      } = constructor.prototype

      , definition = {
          name
        , constructor
        , connectedCallback
        , disconnectedCallback
      }

      console.warn ('Definining', definition, name, constructor, options)

      void (_=>{}).apply
        ( window.customElements, this.register ( name, constructor ) )
    }
  }

  register (name, Class) {
    // perhaps this goes in swizzle
    (this [name] = Class)
      .localName = name;

    Class.clone =
      document.createElement (name);

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
          .map  (this.upgrade (Class))
    }
  }

  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (constructor) {
    return function (element) {

      console.log (new constructor)

//    Object
//      .setPrototypeOf
//        (element, Object.create (constructor.prototype))
//      .connectedCallback ()
    }
  }

  // http://nshipster.com/method-swizzling/
  static swizzle ( name, ... Class ) {

    return definition // tuple
  }
}
