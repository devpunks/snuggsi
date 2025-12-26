// https://dev.to/jakobjingleheimer/custom-esm-loaders-who-what-when-where-why-how-4i1o


const { readFileSync: read } = require('node:fs')

module.exports.resolve = async function (specifier, context, nextResolve) {
  console.log ( 'resolve: ', specifier )
  console.log ( 'context:\n', context )

  let redirect = 'app.prod.mjs';

  switch(process.env.NODE_ENV) {
    case 'development':
      redirect = 'app.dev.mjs';
      break;
    case 'test':
      redirect = 'app.test.mjs';
      break;
  }

  // return nextResolve(redirect);
  return nextResolve(specifier);
}

module.exports.load = async function(url, context, nextLoad) {
  console.log ( 'load: ', url )
  console.log ( 'context:\n', context )


//if (context.format !== 'typescript') { return nextLoad(url) }

//const rawSource = '' + (await nextLoad(url, { ...context, format: 'module' })).source

//const { code: transpiledSource } = await transform(rawSource, {
//  format: 'esm',
//	loader: 'ts',
//	sourcemap: 'inline',
//	target: 'esnext',
//})


  const ret = !!! url.includes ( 'file://' )
    ? nextLoad ( url )
    : { format: 'module'
      , shortCircuit: true
      , source: read ( url.replace ( 'file://', '' ), 'utf8' )
      }

  return ret
}
