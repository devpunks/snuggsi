/* 

  http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
  
  a declarative micro-router element that maps views
  to templates.
  
  routes are registerable through the `route` function.
  
  Example:
  route('/', 'main')

*/

const
  fragment = this.location.hash
, routeRegistry = {}
, routerConfig = {}

  // register a route within the registry
, route = (path, element) => 
  {
    routeRegistry[path] = { element: element }
  }

  /* 
    configures common router settings

    view: element in which to render templates
  */ 
, setRouteConfig = (view) => 
  {
    routerConfig['view'] = view
  }

  /* 
    renders template into the dom
    within the route of the current hash state.
  */
, router = () => 
  { 

    let 
      defaultView = 'view'
      // if view defined in config, attempt to resolve.
      // otherwise, check for existence of default.
    , view = (document.getElementById(routerConfig.view) ||
              document.getElementById(defaultView))

    , root = view ? view : 
        // view is non-existent, create view element.
        (() => {

          let 
            element = document.createElement('div')

          element.setAttribute
          ('id', defaultView)

          document.body.appendChild(element)

          return element

        })()

    // the current router hash, removing slash.
    , url = location.hash.slice(1) || '/'
    , route = routeRegistry[url];

    if(view && route)
      // render route template, inject into element
      view.innerHTML = new Template(route.element).innerHTML

  }


// dispatch to `router` on hash change and page load.
window.addEventListener('hashchange', router)
window.addEventListener('load', router);
