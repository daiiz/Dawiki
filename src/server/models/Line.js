const moment = require('moment')
const hash = require('./hash')

var LINE = {
  raw: '',
  page_id: '',
  links: {
    internal: [],
    external: [],
    web: []
  },
  line_id: '',
  created: '',
  last_modified: ''
}

exports.Line = (settings = {}) => {
  var t = moment().unix()
  var l = LINE
  l.raw = settings.raw
  l.page_id = settings.page_id
  l.created = '' + t
  l.last_modified = '' + t
  l.line_id = hash.md5(`/${l.page_id}/${l.created}`)
  return l
}