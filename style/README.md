# SNUGGSI.STYLE

## Style
```bash
$ bin/style [component-directory | style-file.{sss,css}]
```

This routine will take **component-directory** as a parameter

### Styling a Component
```bash
$ bin/style ./foo-bar
```

  - _(optional)_  Processes `./foo-bar/index.sss` styles as [Snuggsi Style Sheets](#snuggsi-style-sheets)
  - Processes `./foo-bar/index.css` styles as [Cascading Style Sheets](#cascading-style-sheets)
  - Outputs to STDOUT _(Great for `|` pipe appending with classic CSS bundles)_


### Cascading Style Sheets
```bash
$ bin/style index.css
```

  - Cross-platform CSS Properties support!
  - Cross-platform CSS Grid support! _(Yes IE11.0)_


#### CSS Custom Properties
```CSS
:root {
  --bad-ass-green: #bada55
}

body { /* Before */
  background: var(--bad-ass-green)
}


body /* After */
  { background: #bada55 }
```


#### CSS Grid
```CSS
body { /* Before */

  /* Supports all CSS Grid properties */

  grid-template-areas: 'foo bar'
}


body { /* After */
  -ms-grid-template-areas: 'foo bar';
  grid-template-areas: 'foo bar'
}
```


### Snuggsi Style Sheets
```bash
$ bin/style index.sss
```

  - Inserts curly braces
  - No need for semicolons _(Inserts semi-colons `;`)_
  - `@import` inline styles
  - Removes comments from styles
  - Indentation based stylesheets _(Inserts curly braces `{ /* rules /* }`)_
