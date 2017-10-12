## Style
```bash
$ bin/style [component-directory | style-file.{sss,css}]
```

This routine will take **component-directory** as a parameter

### Styling a Component
```bash
$ bin/style foo-bar
```

  - Searches for `foo-bar/index.sss` or `foo-bar/index.css` file as entry point.
  - _(optional)_  [Snuggsi Style Sheets](#snuggsi-style-sheets)
  - Leaves `index.min.css` as artifact. _(Great for appending to classic CSS bundles)_


### Cascading Style Sheets
```bash
$ bin/style index.css
```

  - Cross-platform CSS Properties support!
  - Cross-platform CSS Grid support!


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

  - No need for semicolons
  - `@import` inline styles
  - Removes comments from styles
  - Indentation based stylesheets
