// DocumentFragment() constructor polyfill
//if (! 'DocumentFragment' in self)
//  self.DocumentFragment =
//    function () { return document.createDocumentFragment () }

// http://caniuse.com/#search=template
// Polyfill for IE 11
// HTMLTemplateElement.content = DocumentFragment
// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
void function () {
  if ('content' in document.createElement ('template')) return

  for (var template
    of document.getElementsByTagName ('template'))
      (template.content = new DocumentFragment)
        .innerHTML = template.innerHTML
} ()
