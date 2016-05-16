module.exports = function style(split, median) {
  var bad = split.ratio / median

  if (bad > 1.2) return 'background-color: rgb(255,170,170)'

  return 'background-color: rgb(255,255,255)'
}

