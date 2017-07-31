const ava = require('ava')
const Store = require('../../server/store')
var store = new Store()

ava.test(t => {
  // ローカルDatastoreの起動に失敗しているとここがコケる
  // 失敗して時はDataStore内のダミーデータ1件が取得されている
  return store.runSampleQuery().then(entities => {
    t.is(entities.length, 0)
  }).catch(e => {})
})
