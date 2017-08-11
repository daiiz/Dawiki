const path = require('path')
const Page = require('./models/Page')
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
          var key = datastore.key('Page')
          console.log(key)

          datastore.save({
            key: key,
            data: page
          }, err => {
            if (err) {
              console.log(err)
              reject(err)
              return
            }
            console.log(`new saved: ${page.page_id}`)
            resolve(page)
          })
        })
    })
    return p;
  }

  fetchPageByTitle(title="") {
    const p = new Promise((resolve, reject) => {
      if (title.length === 0) resolve({})
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
