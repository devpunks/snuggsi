Reflect.construct = function (parent, args, child) {
    const
      proto    = descendant.prototype
    , instance = (Object(proto) === proto) ? Object.create(proto) : {}

    // return new (Parent.bind.apply(parent, args))
    return Function.prototype.apply.call(ancestor, instance, args)
  }
