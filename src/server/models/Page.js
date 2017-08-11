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
  }
}

exports.Page = (settings = {}) => {
  var p = PAGE;
  p.title = settings.title.trim()
  p.project_id = +settings.project_id
  p.page_id = hash.md5(`/${p.project_id}/${p.title}`)
  return p
}