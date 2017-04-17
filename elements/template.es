// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

const Template = function ( name = 'snuggsi' ) {

  return Object.assign (factory (...name), { bind })

  function factory (name) {
    return (
      document.querySelector ('template[name='+name+']').cloneNode (true)
        || document.createElement ('template'))
  }

  function bind (context) {
    context = Array.isArray (context) ? context : [context]
    console.log ('binding', context)
  }
}

