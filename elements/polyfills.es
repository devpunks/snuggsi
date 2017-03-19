//var HTMLElementShim = HTMLElement;

//window.HTMLElement = function () {
//  console.warn ('where the fuck am i?', this)
//}

//window.HTMLElement.prototype = HTMLElementShim.prototype
//window.HTMLElement.constructor = HTMLElementShim

const NativeHTMLElement = window.HTMLElement
const nativeDefine = window.customElements.define
const nativeGet = window.customElements.get

const tagnameByConstructor = new Map()
const constructorByTagname = new Map()
let browserConstruction = false
let userConstruction = false

//window.HTMLElement = function() {
//  if (!browserConstruction) {
//    const tagname = tagnameByConstructor
//      .get(this.constructor)

//    const fakeClass = nativeGet
//      .call(window.customElements, tagname)

//    // Make sure that the fake constructor
//    // doesn't call back to this constructor
//    userConstruction = true

//  //  console.warn (fakeClass)
//    const instance = new (fakeClass)()
//    return instance
//  }
//  // Else do nothing.
//  // This will be reached by ES5-style classes doing
//  // HTMLElement.call() during initialization
//  browserConstruction = false
//}

//window.HTMLElement.prototype =
//  Object.create(NativeHTMLElement.prototype)

window.HTMLElement.prototype.constructor =
  window.HTMLElement

//window.customElements.define = (tagname, elementClass) => {
window.cla = elementClass
console.warn ('tag', tagname)
console.warn ('Class', elementClass)
console.warn ('Constructor', elementClass.constructor)

console.warn ('Prototype', elementClass.prototype)
console.warn ('Dunda Prototype', elementClass.__proto__)
console.warn ('Prototype ctor', elementClass.__proto__.constructor)

    const elementProto = //elementClass.prototype
      elementClass.__proto__

    const StandInElement = class extends NativeHTMLElement {
      constructor() {
        // native HTMLElement constructor
        super()

//      // The prototype will be wrong up because the browser used our fake
//      // class, so fix it:
//      Object.setPrototypeOf(this, elementProto)

//      if (!userConstruction) {
//        // Make sure that user-defined constructor
//        // bottom's out to a do-nothing
//        // HTMLElement() call
//        browserConstruction = true
//        // Call the user-defined ctor on our instance:
//        elementClass.call (this)
//      }

//      userConstruction = false
//    }
//  }

//  const standInProto = StandInElement.prototype

////StandInElement.observedAttributes = elementClass.observedAttributes

//  standInProto.connectedCallback =
//    elementProto.connectedCallback

////standInProto.disconnectedCallback =
////  elementProto.disconnectedCallback

////standInProto.attributeChangedCallback =
////  elementProto.attributeChangedCallback

////standInProto.adoptedCallback =
////  elementProto.adoptedCallback

//  console.log(CustomElementRegistry.prototype.define)

//  if (!nativeGet.call(window.customElements, tagname)) {
//    console.warn ('registering', tagname, StandInElement)
//    nativeDefine.call(window.customElements, tagname, StandInElement)
//  }  else
//    console.warn ('Already registered', tagname)
//}

