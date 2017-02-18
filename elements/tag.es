function tag (...fragments) {

  let html = ('string' === typeof fragments [0])
    ? fragments [0]
    : fragments [0][0]

  let context = fragments [1]

  let bind = context => {

    const pattern = Object.
      keys (context).
      map (key => `{${key}}`).
      join (`|`)

    const expression = new RegExp (pattern,`g`)

    html.replace
      ( expression, match => context [match.replace (/{|}/g, '')] )
  }

  return context
    ? bind (context)
    : context => bind (context)
}

// Contextual auto-escaping
// qsa`.${className}`;
// safehtml`<a href="${url}?q=${query}" onclick="alert('${message}')" style="color: ${color}">${message}</a>`;
//
// // Localization and formatting
// l10n`Hello ${name}; you are visitor number ${visitor}:n! You have ${money}:c in your account!`
//
// // Embedded HTML/XML
// jsx`<a href="${url}">${text}</a>` // becomes React.DOM.a({ href: url }, text)
//
// // DSLs for code execution
// var childProcess = sh`ps ax | grep ${pid}`
