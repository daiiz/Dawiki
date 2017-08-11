import { Store } from '../../build/server/store'
const ava = require('ava')
var store = new Store()

ava.test('sampleQuery', t => {
  // ローカルDatastoreの起動に失敗しているとここがコケる
  // 失敗して時はDataStore内のダミーデータ1件が取得されている
  return store.runSampleQuery().then(entities => {
    t.is(entities.length, 0)
  }).catch(e => {})
})

ava.test('createPage', t => {
  return store.createPage('').then(page => {
    t.is(page.page_id, undefined)
  }).catch(e => { })
})

ava.test('createPage', t => {
  return store.createPage('/').then(page => {
    t.is(page.page_id, undefined)
  }).catch(e => { })
})

ava.test('createPage', t => {
  return store.createPage('Sample').then(page => {
    t.is(page.title, 'Sample')
    t.is(page.page_id, '2629d8e2cb22ce17ebbf9f82e3632213')
  }).catch(e => {})
})

ava.test('fetchPageByTitle', t => {
  return store.fetchPageByTitle('').then(page => {
    t.is(page.page_id, undefined)
  }).catch(e => {})
})

// 開発環境にページが増殖しないように確認する
ava.test('countPages', t => {
  return store.countPages().then(pageNum => {
    t.is(pageNum, 1)
  }).catch(e => {})
})
