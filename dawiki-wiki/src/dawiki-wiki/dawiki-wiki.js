const $ = require('jquery')
const diff = require('diff')
const ENTER = 13
const TAB = 9

window.a = () => { console.log(888) }
window.dawiki = window.dawiki || {}

window.dawiki.spans = (str, caret = null) => {
  var $line = $(`<div class="text"></div>`)
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i)
    var $span = $(`<span class="c">${c}</span>`)
    if (caret !== null && i >= caret - 2) {
      $span.addClass('n')
    }
    if (c === '[' || c === ']') {
      $span.addClass('b');
    }
    $line.append($span)
  }
  return $line[0]
}

window.dawiki.initTextarea = (elem) => {
  $(elem).on('keydown', e => {
    if (e.which === TAB) return false
  })

  $(elem).on('keypress', e => {
    if (e.which === ENTER) {
      return false
    }
  }).bind('blur', function () {
    var $t = $(this)
    var str = $t.val().replace(/\n/g, '')
    if ($t.val() !== str) $t.val(str)
  })
}

window.dawiki.diff = (oldStr, newStr) => {
  return diff.diffChars(oldStr, newStr)
}

// キーの判定
window.dawiki.isEnter = (e) => {
  return (e.code === 'Enter' || e.keyCode === 13)
}

window.dawiki.isBackspace = (e) => {
  return (e.code === 'Backspace' || e.keyCode === 8)
}

window.dawiki.isArrowUp = (e) => {
  return (e.code === 'ArrowUp' || e.keyCode === 38)
}

window.dawiki.isArrowDown = (e) => {
  return (e.code === 'ArrowDown' || e.keyCode === 40)
}

window.dawiki.isArrowLeft = (e) => {
  return (e.code === 'ArrowLeft' || e.keyCode === 37)
}

window.dawiki.isArrowRight = (e) => {
  return (e.code === 'ArrowRight' || e.keyCode === 39)
}
