# snuggsi.Server

_snuggsi ツ Server - Feel right at `$HOME`_


## .mount

Mount resource

```javascript
const
  { Server }
    = require ('snuggsi')

(new Server).serve  ``
  .mount ( 'foo', resource `bar` )
```

## .serve

Serve a specified directory as root

```javascript
const
  { Server }
    = require ('snuggsi')

(new Server).serve  `path/to/static/assets`
```
