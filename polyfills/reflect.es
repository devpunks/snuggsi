window.Reflect
  = window.Reflect
  || {}

Relect.construct = (parent, args, child) => {
  const
    prototype
      = descendant.prototype

  , instance
      = ( Object (prototype) === prototype )
      ? Object.create (prototype)
      : {}

  // return new (Parent.bind.apply(parent, args))
  return Function
    .prototype
    .apply
    .call (parent, instance, args)
}
