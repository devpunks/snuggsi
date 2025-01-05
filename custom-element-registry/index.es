// Polyfills
//   - https://github.com/webcomponents/polyfills

// Scoped CustomElementRegistry
//   - https://github.com/whatwg/html/issues/10854
//   - https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry
//   - https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md
//   - https://github.com/WICG/webcomponents/issues?q=is%3Aissue+label%3A%22scoped+custom+element+registry%22

window.customElements =
  window.customElements
  || {/* microfill */}

void ( _ => { // CustomElementRegistry - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry

  customElements.define = ( name, constructor ) => {

    !! /\-/.test (name)
    && (customElements [name] = constructor)
    && [].slice
      // https://nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      .call ( document.querySelectorAll (name) )
      .map  ( customElements.upgrade )
  }


  customElements.upgrade = function (root) {

    const candidates = []

    // Here's where we can swizzle
    // https://github.com/whatwg/html/issues/1704#issuecomment-241881091

    Object.setPrototypeOf
      (root, customElements [root.localName].prototype)

    root.connectedCallback ()
  }


  void (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let root of mutation.addedNodes)

         /\-/.test ( customElements [root.localName] )
           && customElements.upgrade (root)
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

})() /* CustomElementRegistry */

