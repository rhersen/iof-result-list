module.exports = {
  map: (a = [], arg) => {
    const f = typeof arg === 'string' ? e => e[arg] : arg
    return a.map ? a.map(f) : Array.prototype.map.call(a, f)
  },
}
