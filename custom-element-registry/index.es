window.customElements =
  window.customElements
  || {/* microfill */}

void ( _ => { /* CustomElementRegistry */

  customElements.define = ( name, constructor ) => {

    !! /\-/.test (name)
    && (customElements [name] = constructor)
    && [].slice
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
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

         !! /\-/.test (root.localName)
         && customElements [root.localName]
         && customElements.upgrade (root)
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

})() /* CustomElementRegistry */

