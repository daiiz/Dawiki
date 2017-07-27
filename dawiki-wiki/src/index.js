const dawikiWiki = require('./dawiki-wiki/dawiki-wiki');
const $ = require('jquery');

window.dawiki = window.dawiki || {};
window.dawiki.addEventListener = (eventName, func) => {
  $(window).on(eventName, e => {
    func(e);
  });
};