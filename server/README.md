# snuggsi.Server

_snuggsi ツ Server - Feel right at `$HOME`_


## Media MIME Types

  - MDN Properly COnfiguring Server MIME Types - https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Configuring_server_MIME_types

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
