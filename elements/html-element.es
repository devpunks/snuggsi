// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

window.HTMLElement = function (constructor, element) {

  const E = function HTMLElement () {

    console.log ('Makin HTML BABY!', this.constructor)
      element = document.createElement ('foo-world')
    console.log ('element', element, element.prototype)

    return Object.setPrototypeOf
      (element, this.constructor.prototype)

    return element
  }

  E.prototype = constructor.prototype

  return E

} (HTMLElement)
