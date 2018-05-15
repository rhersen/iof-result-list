function interpolate(x, x0, y0, x1, y1) {
  const dx = x1 - x0
  const dy = y1 - y0
  const d = x - x0
  return y0 + dy * d / dx
}

module.exports = function style(split, median) {
  const good = median / split.ratio
  const bad = split.ratio / median

  if (bad < 1) {
    const rb = Math.floor(interpolate(bad, 0, 0, 1, 256))
    return `background-color: rgb(${rb},255,${rb})`
  }

  if (good < 0.9) {
    const g = Math.floor(interpolate(good, 0, 0, 0.9, 256))
    return `background-color: rgb(255,${g},127)`
  }

  const b = Math.floor(interpolate(good, 0.9, 127, 1, 255.9))
  return `background-color: rgb(255,255,${b})`
}

