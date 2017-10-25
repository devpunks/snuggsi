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


customElements
  = customElements
    || {/* microfill */}


new class /* CustomElementRegistry */ {

  constructor ()
    { customElements.define = this.define.bind (this) }


  define ( name, constructor ) {
    this [name] = constructor

    console.warn ('the constructor', name, this [name])

    // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
    void

    [].slice
      .call ( document.getElementsByTagName (name) )
      .map  ( this.upgrade, this )
  }


  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  // "Dmitry's Brain Transplant"
  upgrade (node) {

    // Here's where we can swizzle
    // http://nshipster.com/method-swizzling/
//  new Function ('class extends HTMLElement {}')

    Object.setPrototypeOf
      (node, this [node.localName].prototype)
        .connectedCallback ()
  }
}

