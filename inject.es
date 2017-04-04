// https://github.com/ded/script.js
// injects script @ `url` after current script
// http://stackoverflow.com/questions/5168451/javascript-require-on-client-side#answer-8536369
function inject (url, options) {
  options = options || {}
 
console.log ('inject', arguments)
  var script = document.createElement ('script')

  script.src = url.match (/\.(es|js)$/) ?
    url : `${url}.es`
  
  script.async = 'async' in options
    ? options.async : false

  document.currentScript
    .after (script, document.currentScript)

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
