// see global-event-handlers.es:onconnect

mirror (template, insert) {

  template = template.cloneNode (true)

  insert = (replacement, name, slot) =>
    (name = replacement.getAttribute ('slot')) &&

    (slot = template.content.querySelector ('slot[name='+name+']'))
       // prefer to use replaceWith however support is sparse
       // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
       // using `Node.parentNode` - https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
       // & `Node.replaceChid` - https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild
       // as is defined in (ancient) W3C DOM Level 1,2,3
       .parentNode
       .replaceChild (replacement, slot)

  for (let replacement of this.selectAll ('[slot]'))
    insert (replacement)

  Array
    .from (template.attributes)

    // skip swapping attribute if setting exists
    .filter (attr => !!! this.attributes [attr.name])

    .map  (attr => this.setAttribute (attr.name, attr.value))

  this.innerHTML = template.innerHTML
}

