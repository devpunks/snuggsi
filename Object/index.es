// MDN Object.hasOwnProperty
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
//
// Object.getOwnPropertyDescriptor
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
//
// Object.getOwnPropertyDescriptors
//   - http://2ality.com/2016/02/object-getownpropertydescriptors.html
//   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
//

function getOwnPropertyDescriptors (prototype) {
  console.log ('calling descriptors for', prototype)

  return []
}

var b = Object.getOwnPropertyDescriptors

console.warn ('Polyfilling Object.getOwnPropertyDescriptor', 'getOwnPropertyDescriptors' in Object)
