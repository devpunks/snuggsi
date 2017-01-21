class Validator {
  constructor () {
  }

  set (object, property, value) {
    console.log (arguments)

    // store current object [property]
    // in WeakMap for versioning
    object [property] = value
  }
}
