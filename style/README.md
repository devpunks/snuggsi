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
  - _(optional)_ Preprocess `foo-bar/index.sss` to `foo-bar/index.css`
  - Leaves `index.min.css` as artifact. _(Great for appending to classic CSS bundles)_


### Cascading Style Sheets


### Snuggsi Style Sheets
```bash
$ bin/style index.sss
```

  - Indentation based stylesheets
  - No need for semicolons
  - `@import` inline styles
  - Comment removal
  - Minification

