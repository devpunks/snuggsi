window.Reflect
  =  window.Reflect
  || {/* microfill */}

Reflect.construct = (parent, args, child) => {
  const
    prototype
      = child.prototype

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
