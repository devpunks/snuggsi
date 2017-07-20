// INTERESTING! Converting `Template` to a class increases size by ~16 octets

const Template = HTMLTemplateElement = function (name) {

  // create shallow clone using `.getOwnPropertyDescriptors`
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors#Examples
  // https://docs.microsoft.com/en-us/scripting/javascript/reference/object-getownpropertydescriptor-function-javascript
  // NO IE SUPPORT!!!!
  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {

    let
      html     = ''
    , template = this.innerHTML
    , contexts = [].concat ( ... [context] )   // https://dom.spec.whatwg.org/#converting-nodes-into-a-node
    , keys     = Object.keys (contexts [0]).concat (['#'])    // memoize keys
    , tokens   = keys.map (key => '{'+key+'}') // memoize tokens
    , fragment = document.createElement ('template')

    , deposit = (context, index) => {
        let clone = template

        context = (typeof context  === 'object')
          ? context : { self: context }

        context ['#'] = index

        for (let i=0; i<tokens.length; i++)
          clone = clone
            .split (tokens [i])
            .join  (context [keys [i]])

        return clone
      }

    void (this.dependents || [])
      .map (dependent => dependent.remove ())

    for (let i=0, final = ''; i<contexts.length; i++)
      html += deposit (contexts [i], i)

    fragment.innerHTML = html

    this.dependents = Array.from // non-live
      (fragment.content.childNodes)

    this.after ( ... this.dependents )
  }
}
