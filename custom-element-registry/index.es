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


! window.customElements
  && (customElements = {/* microfill */})


new class CustomElementRegistry {

  constructor (/*{ define, get, whenDefined } = customElements */) {
    customElements
      .define = this
        .define (_=> {}) // (customElements.define)
        .bind (this)
  }

  define ( delegate ) {

    // this.running = undefined

    //  definition = this.swizzle ( definition );

    return ( name, constructor ) =>
      (delegate).apply
        ( customElements, this.register ( name, constructor ) )
  }


  register () {

    'loading' == document.readyState

      ? addEventListener
        ('DOMContentLoaded', this.queue ( ... arguments ))

      : this.queue ( ... arguments )()

    return arguments
  }


  queue ( name, constructor ) {
    return event =>
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      [].slice
        .call ( document.getElementsByTagName (name) )
        .map  ( this.upgrade, constructor.prototype )
  }


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (element) {

    // Here's where we can swizzle
    // see this.swizzle ()
    Object.setPrototypeOf
      (element, this)
        .connectedCallback
          && element.connectedCallback ()
  }

// http://nshipster.com/method-swizzling/
//swizzle ( name, ... Class ) {
//  see elements/html-custom-element.es
//}
}


// select the target node
var m = []

// create an observer instance
window.MutationObserver &&

new MutationObserver ( mutations => {
  for (let mutation of mutations) mutation
})

.observe
  (document.body, { childList: true, subtree: true })
