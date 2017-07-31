require('./dawiki-wiki/dawiki-wiki')
window.wiki = require('../../src/wiki')

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

window.dawiki.append = (a, b) => {
  $(a).append($(b))
}

window.dawiki.remove = (elem, selector) => {
  $(elem).find(selector).remove()
}

window.dawiki.find = (elem, selector) => {
  return $(elem).find(selector)
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

window.dawiki.index = (elem, parent) => {
  var idx = $(parent).index(elem) || -1
  return idx
}

window.dawiki.rand = () => {
  return Math.floor(Math.random() * 1000000) + 1
}

window.dawiki.addClass = (elem, classNames) => {
  classNames.forEach(cn => {
    $(elem).addClass(cn)
  })
}

window.dawiki.hasClass = (elem, className) => {
  return $(elem).hasClass(className)
}

window.dawiki.css = (elem, styles) => {
  $(elem).css(styles)
}
