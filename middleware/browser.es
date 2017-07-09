module.export = {
  route: "/foo",

  handle: function (request, respose, next) {
    console.log ('SNUUUGGSS', arguments)
  }
}
