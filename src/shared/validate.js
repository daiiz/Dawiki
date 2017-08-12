
exports.lengthGtZero = (vals) => {
  for (var i = 0; i < vals.length; i++) {
    if (vals[i].length === 0) return false
  }
  return true
}