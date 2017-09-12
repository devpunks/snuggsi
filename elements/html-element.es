// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors

//window.HTMLElement = function (constructor) {

//  const E = function HTMLElement () {

//    console.dir (this.constructor)
//  }

//  E.prototype = Object.create (constructor.prototype)
//  E.prototype.constructor = constructor

//  return E

//} (HTMLElement)
