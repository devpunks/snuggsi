// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

window.HTMLElement = function (constructor) {

  const E = function HTMLElement () {

    const element = document.createElement
      ('section')
//    (this.constructor.localName)

console.warn (this.constructor)

//  console.warn ('element', constructor, this.constructor.localName, element)

    return Object.setPrototypeOf
      (element, this.constructor.prototype)
  }

  E.prototype = constructor.prototype

  return E

} (HTMLElement)
