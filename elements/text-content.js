// MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
//
// Living Standard
// https://dom.spec.whatwg.org/#dom-node-textcontent
//
// DOM Level 1
// https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent

class TextContent extends Text {

  constructor (value) {
    super (value)
  }

  bind (node) {
    this.textContent.length
      ? node.textContent = this.textContent
      : this.textContent = node.textContent

    // MDN
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit
    //
    // Living Standard
    // https://dom.spec.whatwg.org/#dictdef-mutationobserverinit
    //
    // DOM Level 4
    // https://www.w3.org/TR/dom/#mutationobserverinit

    const configuration = { characterData:true, childList:true }

    // MDN
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    //
    // Living Standard
    // https://dom.spec.whatwg.org/#mutation-observers
    // https://dom.spec.whatwg.org/#mutationobserver
    //
    // DOM Level 4
    // https://www.w3.org/TR/dom/#mutationobserver

    void (new MutationObserver (this.observe.bind (node))) // bound Text observation

      // MDN
      // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#observe()
      //
      // Living Standard
      // https://dom.spec.whatwg.org/#dom-mutationobserver-observe
      //
      // DOM Level 4
      // https://www.w3.org/TR/dom/#dom-mutationobserver-observe

      .observe (this, configuration)


    void ( new MutationObserver ( this.observe.bind (this) ) ) // bound Node observation

      .observe (node, configuration)
  }

  observe (records, observer) {

    // MDN
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
    //
    // Living Standard
    // https://dom.spec.whatwg.org/#mutationrecord
    //
    // DOM Level 4
    // https://www.w3.org/TR/dom/#mutationrecord

    for (const record of records)
      this.textContent = record.target.textContent
  }
}
