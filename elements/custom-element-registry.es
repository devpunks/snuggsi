// The CustomElementRegistry Interface
// WHATWG - https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-api
//
// HTML Element Constructors
//   - https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
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


!!! window.customElements
  && (window.customElements = {/* microfill */})


new class CustomElementRegistry {

  constructor ({ define, get, whenDefined } = customElements ) {

    window.customElements
      .define = this
        ._define (undefined) // (define)
        .bind (this)
  }

  _define ( delegate = _=> {} ) {

    // this.running = undefined

    //  definition = this.swizzle ( definition );

    return ( name, constructor, options ) =>
      (delegate).apply
        ( window.customElements, this.register ( name, constructor ) )
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
    return event =>
      [].slice
        .call
          // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
          (document.getElementsByTagName (name))

        // .reverse () // should be able to do depth first
        .map
          (this.upgrade (Class))
  }


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (constructor) {

    // Here's where we can swizzle

    return element =>

      Object.setPrototypeOf
        (element, constructor.prototype)

      .connectedCallback
        && element.connectedCallback ()
  }

  // http://nshipster.com/method-swizzling/
  swizzle ( name, ... Class ) { }

}

