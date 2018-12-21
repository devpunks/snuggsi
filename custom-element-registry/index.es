window.customElements =
  window.customElements
  || {/* microfill */}

void ( _ => { /* CustomElementRegistry */

  customElements.define = ( name, constructor ) => {

    customElements.define
      = this.define.bind (this)

    customElements.upgrade
      = this.upgrade.bind (this)
  }


  define ( name, constructor ) {

    this [name] = constructor

    void

    [].slice
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      .call ( document.querySelectorAll (name) )
      .map  ( this.upgrade, this )
  }


  // "Dmitry's Brain Transplant"
  // https://wiki.whatwg.org/wiki/Custom_Elements#Upgrading
  upgrade (node) {

    // Here's where we can swizzle
    // https://github.com/whatwg/html/issues/1704#issuecomment-241881091
    this [node.localName]

    &&

    Object
      .setPrototypeOf (node, this [node.localName].prototype)
      .connectedCallback ()
  }
}

