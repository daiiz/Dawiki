const request = require('superagent')
const validate = require('../shared/validate')
// params
window.WiKi = window.WiKi || {}

exports.initWikiPage = () => {
  var a = window.location.href.split(/\//g)
  const pageTitle = decodeURIComponent(a.pop())
  const projectName = a.pop()
  WiKi.title = pageTitle
  WiKi.projectName = projectName
  console.log(projectName, pageTitle)
  return [projectName, pageTitle]
}

exports.fetchPage = (projectName = '', title = '', resolve=function (){}) => {
  if (validate.lengthGtZero([projectName, title])) {
    request
      .post(`/api/${projectName}/${title}`)
      .send({})  
      .end((err, res) => {
        var page = res.body
        WiKi.pageId = page.page.page_id
        if (resolve) resolve(page)
      })
  } else {
    if (resolve) resolve({})
  }
}

exports.insertLine = (raw='', lineAfter=null, resolve=function(){}) => {
  var projectName = WiKi.projectName
  var title = WiKi.title
  var pageId = WiKi.pageId
  var lineIdAfter = lineAfter.id
  if (lineIdAfter === 'title') lineIdAfter = 'HEAD'
  console.log('>>', pageId, raw, lineIdAfter)
  if (validate.lengthGtZero([projectName, title, pageId, lineIdAfter])) {
    request
      .post(`/api/line/insert/${projectName}/${title}`)
      .send({
        page_id: pageId,
        raw_text: raw,
        line_after: lineIdAfter
      })
      .end((err, res) => {
        var line = res.body
        if (resolve) resolve(line.line_id, line.raw)
      })
  } else {
    if (resolve) resolve({})
  }
}