import { Store } from '../../build/server/store'
const ava = require('ava')
var store = new Store()

ava.test('sampleQuery', t => {
  return store.runSampleQuery().then(entities => {
    t.is(entities.length, 1)
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
    t.is(page.page_id, '4c1e7b722b11c9d79e1840052105bc3f')
  }).catch(e => {})
})

ava.test('fetchPageByTitle', t => {
  return store.fetchPageByTitle('').then(page => {
    t.is(page.page_id, undefined)
  }).catch(e => {})
})

ava.test('fetchPageByTitle', t => {
  return store.fetchPageByTitle('Sample').then(page => {
    t.is(page.page_id, '4c1e7b722b11c9d79e1840052105bc3f')
  }).catch(e => {})
})

// 開発環境にページが増殖しないように確認する
ava.test('countPages', t => {
  return store.countPages().then(pageNum => {
    t.is(pageNum, 1)
  }).catch(e => {})
})
