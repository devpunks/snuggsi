void function () {
  if ('content' in document.createElement ('template')) return

  for (var template
    of document.getElementsByTagName ('template'))
      (template.content = new DocumentFragment)
        .innerHTML = template.innerHTML
} ()
