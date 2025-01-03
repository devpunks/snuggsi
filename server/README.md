# snuggsi.Server

_snuggsi ツ Server - Feel right at `$HOME`_


## Features

  -  Middleware
  -  Hot code reloading
  -  Server Side Rendering
  -  Code splitting for every pages/
  -  Automatic transpilation and bundling
  -  Custom layouts with the layouts/ directory
  -  Static file serving. ./ & ./static/ is mapped to /


## Media MIME Types

  - MDN Properly COnfiguring Server MIME Types - https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Configuring_server_MIME_types
  - Brendan Eich / Douglas Crockford discussion on application/ecmascript - https://mail.mozilla.org/pipermail/es-discuss/2011-August/016267.html

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

### References

  - Next - https://github.com/zeit/next.js
  - Nuxt - https://github.com/nuxt/nuxt.js

