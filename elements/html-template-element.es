// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const Template = HTMLTemplateElement = function (name) {

  // create shallow clone using `.getOwnPropertyDescriptors`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#Examples
  // https://docs.microsoft.com/en-us/scripting/javascript/reference/object-getownpropertydescriptor-function-javascript
  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function replace (token, value) {
    console.log (token, value)
  }

  function bind (context) {

    // https://dom.spec.whatwg.org/#converting-nodes-into-a-node
    contexts = [].concat ( ... [context] )

    let
      clone
    , template = this.innerHTML
    , templates

//  template//.innerHTML
    const final =
    contexts
      .map ((context, index) => {

//      context =
//        (typeof context  === 'object') ? context : { self: context }

//      context ['#'] = index

        const keys = Object.keys (context)
        clone = template

        for (let key of keys)
          clone = clone.split ('{'+key+'}').join (context [key])

        return clone

//      console.warn (clone)
//      clone  = this.cloneNode (true)

//      void (new TokenList (clone.content))
//        .bind (context)

//      return clone.content//.innerHTML // immutable snapshot
      })
      .join ('')

        const fragment = document.createElement ('template')

        fragment.innerHTML = final

        this.after (fragment.content)

//  void (this.dependents || [])
//    .map (dependent => dependent.remove ())

//  this.dependents =
//    Array.from // non-live
//      (template.content.childNodes)

//  template.content.childNodes
//    .map (node => this.dependents.push (node))

//  this.depen
//    .map (node => this.after (node))
//  for (let t of templates)
//    this.after ( ... t.childNodes)
  }
}

