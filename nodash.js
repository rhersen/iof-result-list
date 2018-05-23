module.exports = {
  filter: (a = [], arg) => {
    return withStringOrFunction('filter', a, arg)
  },

  forEach: (a = [], arg) => {
    withStringOrFunction('forEach', a, arg)
  },

  map: (a = [], arg) => {
    return withStringOrFunction('map', a, arg)
  },

  min: (a = []) => {
    return withFunction(a, 'reduce', (x, y) => (x < y ? x : y))
  },

  reject: (a = [], { k, v }) => {
    return withFunction(a, 'filter', e => e[k] === v)
  },
}

function withStringOrFunction(method, a, arg) {
  return withFunction(a, method, typeof arg === 'string' ? e => e[arg] : arg)
}

function withFunction(a, method, f) {
  return a[method] ? a[method](f) : Array.prototype[method].call(a, f)
}
