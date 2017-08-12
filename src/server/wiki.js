// Storeにアクセス可能なのはここだけ
import { Store } from '../../build/server/store'

// Pageを取得
exports.wikiPage = (projectId = 0, title = '') => {
  var p = new Promise((resolve, reject) => {
    var store = new Store(projectId);
    store.fetchPageByTitle(title).then(page => {
      resolve(page)
    })
  })
  return p
}

// Lineを取得
exports.wikiLine = (pageId = '', lineId = '') => {
  var projectId = 0
  var p = new Promise((resolve, reject) => {
    var store = new Store(projectId);
    store.fetchLine(pageId, lineId).then(line => {
      resolve(line)
    })
  })
  return p
}

exports.insertNewLine = (raw = '', pageId = '', insertAfterLineId = '') => {
  var projectId = 0
  var p = new Promise((resolve, reject) => {
    var store = new Store(projectId);
    store.fetchPage(pageId).then(page => {
      store.insertLine(raw, page, insertAfterLineId).then(line => {
        resolve(line)
      })
    })
  })
  return p
}

exports.updateLine = (pageId, lineId, raw) => {
  var projectId = 0
  var p = new Promise((resolve, reject) => {
    var store = new Store(projectId);
    store.fetchLine(pageId, lineId).then(async line => {
      if (line.line_id === lineId) {
        line.raw = raw
        await store._updateObject('Line', line)
        resolve(line)
      } else {
        resolve({})
      }
    })
  })
  return p
}

exports.removeLine = (lineId) => {

}
