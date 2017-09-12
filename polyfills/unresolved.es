'use strict';
// It's desireable to provide a default stylesheet
// that's convenient for styling unresolved elements, but
// it's cumbersome to have to include this manually in every page.
// It would make sense to put inside some HTMLImport but
// the HTMLImports polyfill does not allow loading of stylesheets
// that block rendering. Therefore this injection is tolerated here.
//
// NOTE: position: relative fixes IE's failure to inherit opacity
// when a child is not statically positioned.
let style = document.createElement('style');
style.textContent = ''
+ 'body {'
+ 'transition: opacity ease-in 0.2s;'
+ ' } \n'
+ 'body[unresolved] {'
+ 'opacity: 0; display: block; overflow: hidden; position: relative;'
+ ' } \n'

let
  head = document.querySelector('head')

head
  .insertBefore (style, head.firstChild)

