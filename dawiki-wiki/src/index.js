const dawikiWiki = require('./dawiki-wiki/dawiki-wiki');
const $ = require('jquery');

window.dawiki = window.dawiki || {};
window.dawiki.addEventListener = (eventName, func) => {
  $(window).on(eventName, e => {
    func(e);
  });
};

window.dawiki.nextElem = elem => {
  var $n = $(elem).next();
  return ($n.length > 0) ? $n[0] : elem;
};

window.dawiki.prevElem = elem => {
  var $n = $(elem).prev();
  return ($n.length > 0) ? $n[0] : elem;
};