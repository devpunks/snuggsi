class Attributes {
  constructor (state) {
    // http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
    this [Symbol.species] = state
  }

  bind (element) {
    // will silently fail for normal JSON objects
    this [Symbol.species]
      [Symbol.species] = this.update.bind (element)
      // element.setAttribute.bind (element)

    this.map (element)
    this.observe (element)
  }

  // hate exposing this :-(
  update (name, value) {
    console.warn (`updating attribute`, arguments)

    if (this.getAttribute (name) != value)
      this.setAttribute (name, value)
  }

  map (element) {
    for (let property in this [Symbol.species])
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
      element.setAttribute (property, this [Symbol.species] [property])
  }

  observe (element) {
    console.warn ('observing element')

    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit
    const configuration = { attributes: true, attributeOldValue: true}
        // https://dom.spec.whatwg.org/#interface-mutationobserver
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        // DEPRECATED: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
        , observer = new MutationObserver (this.mutate.bind (this))

    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#observe()
    observer.observe (element, configuration)
  }

  // https://dom.spec.whatwg.org/#interface-mutationrecord
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
  mutate (mutations, observer) {
    console.log (`mutating`, this, arguments)

    for (let mutation of mutations) {
      // may want to check to see if attribute has actually mutated. Save a trap call.
      this [Symbol.species]
        [mutation.attributeName] =
        mutation.target.getAttribute (mutation.attributeName)
    }
  }
}
