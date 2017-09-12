// MDN Object.keys
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
//
// MDN Object.hasOwnProperty
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
//
// Object.getOwnPropertyNames
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
//
// Object.getOwnPropertyDescriptor
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
//
// Object.getOwnPropertyDescriptors
//   - http://2ality.com/2016/02/object-getownpropertydescriptors.html
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
//

Object.getOwnPropertyDescriptors

||


Object.defineProperty
  (Object, 'getOwnPropertyDescriptors', { configurable: true, writable: true, value: getOwnPropertyDescriptors })

function getOwnPropertyDescriptors (object) {

  return Object
    .getOwnPropertyNames (object)
    .reduce ((descriptors, key) =>
      Object.defineProperty
        (descriptors, key, { configurable: true, enumerable: true, writable: true, value: Object.getOwnPropertyDescriptor (object, key) })
    , {})
}

