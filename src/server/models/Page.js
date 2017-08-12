const moment = require('moment')
const hash = require('./hash')

var PAGE = {
  title: '',
  project_id: 0,
  page_id: '',
  lines: [],
  links: {
    internal: [],
    external: [],
    web: []
  },
  created:'',
  last_modified: ''
}

exports.Page = (settings = {}) => {
  var t = moment().unix()
  var p = PAGE;
  p.title = settings.title.trim()
  p.project_id = +settings.project_id
  p.created = '' + t
  p.last_modified = '' + t 
  p.page_id = hash.md5(`/${p.project_id}/${p.created}`)
  return p
}