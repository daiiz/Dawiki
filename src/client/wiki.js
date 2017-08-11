const request = require('superagent')

exports.initWikiPage = () => {
  var a = window.location.href.split(/\//g)
  const pageTitle = decodeURIComponent(a.pop())
  const projectName = a.pop()
  console.log(projectName, pageTitle)
  return [projectName, pageTitle]
}

exports.fetchPage = (projectName = '', title = '', resolve=function (){}) => {
  if (projectName.length > 0 && title.length > 0) {
    request
      .post(`/api/${projectName}/${title}`)
      .send({})  
      .end((err, res) => {
        var page = res.body
        if (resolve) resolve(page)
      })
  } else {
    if (resolve) resolve({})
  }
}