// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

  const
    NativeHTMLElement =
      window.HTMLElement

  , nativeDefine =
      window.customElements.define
  , nativeGet =
      window.customElements.get

  , tag_by_constructor = {}
  , constructor_by_tag = {}

  , browser = false
  , user    = false

const HTMLElement = ((HTMLElement) => {

  const element = new Function

  element.prototype =
    Object.create (HTMLElement.prototype)

  element.prototype
    .constructor = HTMLElement

  return class extends HTMLElement {
    constructor () {
      super ()
    }
  }

}) (window.HTMLElement)
