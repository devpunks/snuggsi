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

void new class {

  constructor () {

    Object.getOwnPropertyDescriptors
    || Object.defineProperty
      (Object, 'getOwnPropertyDescriptors', this.descriptor)
  }

  get descriptor () {
    return {
      writable: true
    , configurable: true
    , value: this.getOwnPropertyDescriptors
    }
  }

  getOwnPropertyDescriptors (object) {

    return Object

      .getOwnPropertyNames (object)

      .reduce ((descriptors, key) =>

        Object.defineProperty
          (descriptors, key, {

            writable: true
          , enumerable: true
          , configurable: true

          , value:
              Object.getOwnPropertyDescriptor (object, key)
          })

      , {})
  }
}

