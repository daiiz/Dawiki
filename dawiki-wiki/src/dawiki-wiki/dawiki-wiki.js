const $ = require('jquery')
const ENTER = 13
const TAB = 9

window.a = () => { console.log(888) }
window.dawiki = window.dawiki || {}

window.dawiki.spans = (str) => {
  var $line = $(`<div class="text"></div>`)
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i)
    var $span = $(`<span class="c c-${i}">${c}</span>`)
    $line.append($span)
  }
  return $line[0]
}

window.dawiki.addClass = (elem, classNames) => {
  classNames.forEach(cn => {
    $(elem).addClass(cn)
  })
}

window.dawiki.css = (elem, styles) => {
  $(elem).css(styles)
}

window.dawiki.initTextarea = (elem) => {
  $(elem).on('keydown', e => {
    if (e.which === TAB) return false
  })

  $(elem).on('keypress', e => {
    if (e.which === ENTER) { // || e.which === ARROW_UP || e.which === ARROW_DOWN) {
      // 改行またはタブ文字
      return false
    }
  }).bind('blur', function () {
    var $t = $(this)
    var str = $t.val().replace(/\n/g, '')
    if ($t.val() !== str) $t.val(str)
  })
}
