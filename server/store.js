const path = require('path')
// このままではHerokuでは動かない
const datastore = require('@google-cloud/datastore')({
  projectId: 'daiiz-apps',
  keyFilename: path.join(__dirname, '../keys/datastore.json')
})

// See:
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/0.7.1/datastore
// Samples
var Store = function () {
  var self = this

  this.runSampleQuery = function () {
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
}

module.exports = Store
