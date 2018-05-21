module.exports = {
  filter: (a = [], arg) => {
    const f = typeof arg === 'string' ? e => e[arg] : arg
    return a.filter ? a.filter(f) : Array.prototype.filter.call(a, f)
  },

  forEach: (a = [], arg) => {
    const f = typeof arg === 'string' ? e => e[arg] : arg
    return a.forEach ? a.forEach(f) : Array.prototype.forEach.call(a, f)
  },

  map: (a = [], arg) => {
    const f = typeof arg === 'string' ? e => e[arg] : arg
    return a.map ? a.map(f) : Array.prototype.map.call(a, f)
  },
}
