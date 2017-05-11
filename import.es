// https://github.com/ded/script.js
// injects script @ `url` after current script
// http://stackoverflow.com/questions/5168451/javascript-require-on-client-side#answer-8536369
function import (url, options) {
  options = options || {}
  
  var script = document.createElement ('script')

  script.src = url.match (/\.js$/) ?
    url : `${url}.js`
  
  script.async = 'async' in options
    ? options.async : false

  document.currentScript.parentNode
    .insertBefore (script, document.currentScript)

  return inject
}

// Usage:
/*

// local
inject
  ('baz.js')

// local (implicit) - Assumes `.js` extension
inject
  ('baz')

// `inject`tion chaining
inject
  ('foo')
  ('bar')
  ('baz')
  ('bat')
; // Yes that is valid Javascript/ECMAScript code.

// `async`ronous `inject`ions
inject
  ('foo', {async: true})
  ('bar')
  ('baz')


// remote (implicit) - Assumes `.js` extension
inject
  ('http://foo.bar/baz')

// remote
inject
  // CORS settings
  // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes
  ('https://code.jquery.com/jquery-3.1.1.min.js')
  ('/my-jquery-plugin')

*/
