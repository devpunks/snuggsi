window.Reflect
  =  window.Reflect
  || {/* microfill */}

Reflect.construct = (parent, _, child) => {
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
    .call (parent, instance, _)
}
