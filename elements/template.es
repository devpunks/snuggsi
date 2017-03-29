function Template (name) {
  return function (){
    return Object.assign
      ( factory (name), { bind })    
  }

  function bind (context) {
    let html   = this.innerHTML
      , render = context => tag (html) (context)

      , tags = Array.isArray (context)
          ?  context.map (render)
          : [render (context)]

    this.innerHTML = tags.join ('')

    return this
  }
  
  function factory (name) {
    return (
      document.querySelector (`template[name=${name}]`)
      || document.createElement ('template')
    ).cloneNode (true)
  }
}

document.addEventListener
  ('DOMContentLoaded', 
    _ => console.log ('DOM fully loaded and parsed'))

 Template ``