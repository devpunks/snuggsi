function tokenize (template) {
  // deconstruct 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  template = template[0]

  var tokens = []

  var fragment = document.createElement ('template')

  fragment.innerHTML = (template)

  fragment.content.childNodes.forEach (foo)

  function foo (node) {

    console.dir (node.nodeName)

    console.log (node.textContent.indexOf)
  }
}

console.log (tokenize `    {name} `)