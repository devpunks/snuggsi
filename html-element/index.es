// http://nshipster.com/method-swizzling/
// HTMLElement Swizzle - To swizzle a method is to change a class’s dispatch table in order to resolve messages from an existing selector to a different implementation, while aliasing the original method implementation to a new selector.

// 3.2.3 HTML element constructors
// https://html.spec.whatwg.org/multipage/dom.html#html-element-constructors
// Satisfy Element interface document.createElement
//   - https://dom.spec.whatwg.org/#concept-element-interface

const HTMLElement =

/*
// Domenic discusses
// https://esdiscuss.org/topic/extending-an-es6-class-using-es5-syntax#content-1
I believe this will work in most cases:

function B() {
  const obj = new A();
  Object.setPrototypeOf(obj, new.target.prototype); // or B.prototype, but if you derive from B you'll have to do this dance again

  // use obj instead of this

  return obj;
}
Also, in general you should do

instead of

B.prototype = Object.create(A.prototype);
for slightly better semantics, including class-side inheritance and not clobbering .constructor.
*/

( _ => {
  function E () {}

  E.prototype =
  // E.prototype.__proto__ = ???
  // https://github.com/visionmedia/supertest/blob/master/lib/agent.js

    window.HTMLElement.prototype

  // Prevent `.constructor` clobbering
  // E.__proto__ = window.HTMLElement

    // https://github.com/whatwg/html/issues/1704
    // E.prototype.__proto__
    //   = (E.__proto__ = HTMLElement).prototype

    // Domenic's method
    // Object
    //   .setPrototypeOf
    //     (Object.setPrototypeOf (B, A).prototype, A.prototype)

    return E
})()

