// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const HTMLTemplateElement = Template = function (name) {

  // create shallow clone using `.getOwnPropertyDescriptors`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#Examples
  // https://docs.microsoft.com/en-us/scripting/javascript/reference/object-getownpropertydescriptor-function-javascript
  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    contexts = [].concat ( ... [context] )

    let
      clone
    , template = this.cloneNode (false)

    template.innerHTML =
    contexts
      .map (context => context)
      .map ((context, index) => {

      context =
        (typeof context  === 'object') ? context : { self: context }

      context ['#'] = index

      clone  = this.cloneNode (true)

      void (new TokenList (clone.content))
        .bind (context)

      return clone.innerHTML // immutable snapshot
    })
    .join ('')

    void (this.dependents || [])
      .map (dependent => dependent.remove ())

    this.dependents =
      Array.from
        (template.content.childNodes)

    this.after ( template.content )

    return this
  }
}

