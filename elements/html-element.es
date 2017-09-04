// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

class HTMLCustomElement extends HTMLElement {

  constructor () {
    return Object
      .setPrototypeOf (this, babel)
  }
}

//window.HTMLElement = ((HTMLElement, klass) => {

//  return Object
//    .setPrototypeOf (klass, HTMLElement.prototype)
//})

//(window.HTMLElement, function HTMLElement () {})

