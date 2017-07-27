require('./dawiki-wiki/dawiki-wiki')
const $ = require('jquery')

window.dawiki = window.dawiki || {}
window.dawiki.addEventListener = (eventName, func) => {
  $(window).on(eventName, e => {
    func(e)
  })
}

window.dawiki.nextElem = elem => {
  var $n = $(elem).next()
  return ($n.length > 0) ? $n[0] : elem
}

window.dawiki.prevElem = elem => {
  var $n = $(elem).prev()
  return ($n.length > 0) ? $n[0] : elem
}

window.dawiki.before = (a, b) => {
  $(a).before(b)
}

window.dawiki.after = (a, b) => {
  $(a).after(b)
}

window.dawiki.closest = (elem, selector) => {
  var $t = $(elem).closest(selector)
  return ($t.length > 0) ? $t[0] : null
}

window.dawiki.rand = () => {
  return Math.floor(Math.random() * 1000000) + 1
}
