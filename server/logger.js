// https://www.12factor.net/logs
// https://youtube.com/watch?v=lWmbK6iZML4
// Pino vs Winston
//   - https://betterstack.com/community/comparisons/pino-vs-winston
//   - https://dev.to/wallacefreitas/pino-vs-winston-choosing-the-right-logger-for-your-nodejs-application-369n
// Choosing a logging framework - https://betterstack.com/community/guides/logging/logging-framework/
// Logging libraries - https://betterstack.com/community/guides/logging/best-nodejs-logging-libraries
// Structured logging in Node.js with Winston - https://thedreaming.org/2020/06/24/structured-logging-nodejs
console.log ('LOGGERRRRRRRRRRRRRRRR')

const LEVELS = {
  error: 0 // highest
, warning: 1
, info: 2
, http: 3
, debug: 4
} // LEVELS

import url from 'url'
function log ( request ) {
  let agent = request.headers [ 'user-agent' ]
  , protocol = request.socket.encrypted ? 'https' : 'http'
  , { headers: { host }, method, path, query, url } = request
  , [ hostname, port ] = host.split `:`
  , url_parts = new URL ( url, `${ protocol }://${ hostname }:${ port }` )

  // TODO: put on Request
  , ip = request.headers [ 'x-forwarded-for' ] || request.socket.remoteAddress

  // If X-Forwarded-For contains multiple IPs (from multiple proxies), take the first one
  ip = !!! ip.includes `,`
    ?  ip
    : ip.split `,` [0].trim ``

  console.log ( 'Query: ', query )
  console.log ( 'IP Address: ', ip )

  return `📝 INFO @ [${ ip }] `
    + method + ' '
    + `${ protocol }://${ host }:${ port }${ url } `
    + 'Path: ' + url + ' | '
    + 'Search Query: ' + url_parts.search.replace ( /\?/, '' )  + ' | '
    + agent
} // log

export default function Log ( location = './index.log' ) {
  return ( request, response ) => {
    console.log ( new Date, location, log ( request ) )

    response.setHeader ( 'X-Powered-By', 'devPunks' )
    response.setHeader ( 'X-Timestamp', `${ Date.now () } (${ new Date })` )
  } // =>
} // Log
