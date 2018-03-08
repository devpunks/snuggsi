const
  // decodeURI
  // since these are user defined best to decode everything
  // https://coderwall.com/p/y347ug/encodeuri-vs-encodeuricomponent
  [ decode, encode ]
    = [ decodeURIComponent, encodeURIComponent ]

, parameterized = context =>
    ('params' in context || (context.params = {}))
      && []
        .splice
        .call (context.path.match (prepare), 1) // remove 1st
        .map  ((value, index) => context.params [tokens [index]] = decode (value))
      && context

, tokens = uri => uri.match (/[^{]+(?=})/g)

, capture = uri => new RegExp
    (uri.replace (/{\w+}/g, '([A-Za-z%0-9\-\_]+)'))


module.exports = ( uri, resource, expression) =>

  async (context, next, { method } = context) =>
    capture (uri).test (context.path)
      && (method = method.toLowerCase ())
        ? await  (resource [method] || resource) (context)
        : await  next (context)
