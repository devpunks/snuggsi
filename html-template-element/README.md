# Templates

  - WHATWG HTML template element https://html.spec.whatwg.org/multipage/scripting.html#the-template-element

## `<template>`

The HTML `<template>` element is a mechanism for holding client-side content that is not to be rendered when a page is loaded but may subsequently be instantiated during runtime using JavaScript.

Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the <template> element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.

[Read More on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)


## `HTMLTemplateElement`

  - [Read More on MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement)


### `.content`

This is a `DocumentFragment` returned of the `<template>` content.


## Apple Proposal

  - https://github.com/whatwg/html/issues/2254
  - https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md


### API
  - https://github.com/w3c/webcomponents/issues/685
  - https://github.com/ComponentKitchen/template-instantiation


## Issues
  - ["[templates] Ensure that template instantiation actually improves the platform" #704](https://github.com/w3c/webcomponents/issues/704)


## References

  - https://gist.github.com/WebReflection/267689ec54d7267c853c47480bd35282
  - https://github.com/WebReflection/hyperHTML/pull/100
  - https://github.com/webcomponents/template


