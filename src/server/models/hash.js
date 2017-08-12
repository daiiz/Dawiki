const crypto = require('crypto');

exports.md5 = (src) => {
  var solt = 'kpsfjddadasdda23';
  var md5 = crypto.createHash('md5');
  md5.update(src + solt);
  return md5.digest('hex');
}