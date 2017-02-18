function tag (...fragments) {

  let context  = fragments [1]
  let template = ('string' === typeof fragments [0])
    ? fragments [0]
    : fragments [0][0]

  let map = context => {
    for (const field in context)
      template = template.replace (`{${field}}`, context [field])

    return template
  }

  return context
    ? map (context)
    : context => map (context)
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
