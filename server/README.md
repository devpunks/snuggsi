# snuggsi.Server

_snuggsi ツ Server - Feel right at `$HOME`_


## .mount

Mount resource

```javascript
const
  { Server }
    = require ('snuggsi')

(new Server)
  .mount ( 'foo', resource `bar` )
  .serve  ``
```

## .serve

Serve a specified directory as root

```javascript
const
  { Server }
    = require ('snuggsi')

(new Server).serve  ``
```
