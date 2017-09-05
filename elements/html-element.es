// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

window.HTMLElement = function (constructor, element) {

  const E = function HTMLElement () {

    element = document.createElement
      (this.constructor.localName)

    console.log ('element', element)

    return Object.setPrototypeOf
      (element, this.constructor.prototype)
  }

  E.prototype = constructor.prototype

  return E

} (HTMLElement)
