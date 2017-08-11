import { Store } from '../../build/server/store'

exports.wikiPage = (projectId = 0, title = '') => {
  var p = new Promise((resolve, reject) => {
    var store = new Store(projectId);
    store.fetchPageByTitle(title).then(page => { 
      delete page.page_id
      resolve(page)
    })
  })
  return p
}