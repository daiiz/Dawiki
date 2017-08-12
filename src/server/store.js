const path = require('path')
const validate = require('../shared/validate')
const Page = require('./models/Page')
const Line = require('./models/Line')

// このままではHerokuでは動かない
const datastore = require('@google-cloud/datastore')({
  projectId: 'daiiz-apps',
  keyFilename: path.join(__dirname, '../../keys/datastore.json')
})

// See:
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/0.7.1/datastore
export class Store {
  constructor(projectId = 0) {
    this.projectId = projectId
  }

  // 指定されたLineID行の直後に新規の行を挿入する
  insertLine(raw = '', page = null, insertAfter = '') {
    const self = this
    const p = new Promise(async (resolve, reject) => {
      if (!validate.lengthGtZero([page.page_id, insertAfter])) {
        resolve({})
        return
      }

      // Pageのlinesに行を挿入する
      var lines = page.lines
      var line = null
      if (lines.length === 0) {
        // 先頭に追加
        console.log('HEADDDD')
        line = Line.Line({
          page_id: page.page_id,
          raw: (insertAfter === 'HEAD') ? raw : ''
        })
        lines.push(line.line_id)
      } else {
        // 途中に追加
        line = Line.Line({
          page_id: page.page_id,
          raw: raw
        })
        lines.push(line.line_id) //いまだけ末尾追加
      }

      await self._createLine(line)
      await self._updateObject('Page', page)
      resolve({line_id: line.line_id})
    })
    return p
  }

  _createLine(line) {
    const p = new Promise((resolve, reject) => {
      if (!validate.lengthGtZero([line.line_id])) {
        resolve({})
        return
      }
      var key = datastore.key(['Line', line.line_id])
      datastore.save({
        key: key,
        data: line
      }, err => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        console.log(`new saved: Line_${line.line_id}`)
        resolve(line)
      })
    })
    return p
  }

  _updateObject(kind, obj) {
    const p = new Promise((resolve, reject) => {
      var objId = obj[`${kind.toLowerCase()}_id`]
      if (!validate.lengthGtZero([kind, objId])) { 
        resolve({})
        return
      }

      var key = datastore.key([kind, objId])
      datastore.save({
        key: key,
        data: obj
      }, err => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        console.log(`updated  : ${kind}_${objId}`)
        resolve(obj)
      })
    })
    return p
  }

  // 新規に空ページを作成する
  // 既に存在する場合はそれを返す
  createPage(title = "") {
    const p = new Promise((resolve, reject) => {
      if (title.startsWith('/')) title = title.replace(/^\//, '')
      if (title.length === 0) {
        resolve({})
        return
      }

      ///// !!!
      if (title !== 'Sample') {
        resolve({})
        return
      }

      this.fetchPageByTitle(title)
        .then(page => {
          if (page.page_id) {
            resolve(page)
            return
          }
          var page = Page.Page({
            title: title,
            project_id: this.projectId
          })
          var key = datastore.key(['Page', page.page_id])
          datastore.save({
            key: key,
            data: page
          }, err => {
            if (err) {
              console.log(err)
              reject(err)
              return
            }
            console.log(`new saved: Page_${page.page_id}`)
            resolve(page)
          })
        })
    })
    return p;
  }

  fetchPageByTitle(title='') {
    const p = new Promise((resolve, reject) => {
      if (title.length === 0) {
        resolve({})
        return
      }
      var query = datastore.createQuery('Page')
      query.filter('title', title)
      query.limit(1)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          if (entities.length === 0) resolve({})
          var page = entities[0]
          resolve(page)
        }
      })
    })
    return p;
  }

  fetchPage(pageId='') {
    const p = new Promise((resolve, reject) => {
      if (pageId.length === 0) {
        resolve({})
        return
      }
      var query = datastore.createQuery('Page')
      query.filter('page_id', pageId)
      query.limit(1)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          if (entities.length === 0) resolve({})
          var page = entities[0]
          resolve(page)
        }
      })
    })
    return p
  }

  fetchLine(pageId = '', lineId = '') {
    const p = new Promise((resolve, reject) => {
      if (!validate.lengthGtZero([pageId, lineId])) {
        resolve({})
        return
      }
      var query = datastore.createQuery('Line')
      query.filter('page_id', pageId)
      query.filter('line_id', lineId)
      query.limit(1)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          if (entities.length === 0) resolve({})
          var line = entities[0]
          resolve(line)
        }
      })
    })
    return p
  }

  fetchLines(pageId = '') {
    const p = new Promise((resolve, reject) => {
      if (!validate.lengthGtZero([pageId])) {
        resolve({})
        return
      }
      var query = datastore.createQuery('Line')
      query.filter('page_id', pageId)
      query.limit(1000)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          if (entities.length === 0) resolve({})
          resolve(entities)
        }
      })
    })
    return p
  }

  runSampleQuery() {
    const p = new Promise((resolve, reject) => {
      var query = datastore.createQuery('BotUser')
      query.filter('user_name', 'daiz')
      query.limit(2)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          resolve(entities)
        }
      })
    })
    return p
  }

  countPages() {
    const p = new Promise((resolve, reject) => {
      var query = datastore.createQuery('Page')
      query.limit(100)
      datastore.runQuery(query, (err, entities) => {
        if (err) {
          reject(err)
        } else {
          resolve(entities.length)
        }
      })
    })
    return p
  }
}
