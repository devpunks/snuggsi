function ParentNode ( Element ) {

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // Living Standard HTML5 ParentNode
  // https://dom.spec.whatwg.org/#parentnode
  //
  // MDN ParentNode
  // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
  //
  // ElementTraversal interface
  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal

return class extends Element {

  // id / identify ? // Method used to find descendants by ID

  select ( )
    { return this.selectAll ( ... arguments ) [0] } // select

  selectAll ( strings, ... tokens ) {
    strings = [ ].concat ( strings )

    return [].slice.call
      ( this.querySelectorAll
        ( tokens.reduce // denormalize selector
          ( ( part, token ) => part + token + strings.shift ()
          , strings.shift () )))
  } //selectAll

} // class
} // ParentNode

