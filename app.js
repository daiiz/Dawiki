const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const wiki = require('./build/server/wiki')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));
app.use('/dawiki-wiki', express.static(__dirname + '/dawiki-wiki'));

// Settings for ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

http.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
});

// WiKi page line APIs
app.post('/api/line/insert/:project/:page', (req, res) => {
  var title = req.params.page
  var projectId = 0
  // 挿入する直上のline_id
  var lineAfter = req.body.line_after
  var pageId = req.body.page_id
  var rawText = req.body.raw_text
  wiki.insertNewLine(rawText, pageId, lineAfter).then(line => {
    res.send({line: line});
  })
})

app.post('/api/line/update/:project/:page', async (req, res) => {
  var pageId = req.body.page_id
  var lineId = req.body.line_id
  var rawText = req.body.raw_text
  wiki.updateLine(pageId, lineId, rawText).then(line => {
    res.send({line: line});
  })
})

// WiKi page API
app.post('/api/:project/:page', (req, res) => {
  var title = req.params.page
  var projectId = 0
  wiki.wikiPage(projectId = projectId, title = title).then(async page => {
    var rows = []
    // Lineを展開する
    // 一括Fetchのほうがいいかもしれない
    var lines = page.lines
    for (var i = 0; i < lines.length; i++) {
      var lineId = lines[i]
      await wiki.wikiLine(page.page_id, lineId).then(row => {
        delete row.links
        rows.push(row)
      })
    }
    console.log(rows)  /// ここが空になってしまう
    res.send({page: page, lines: rows});
  })
})

// WiKi page
app.get('/:project/:page', (req, res) => {
  res.render('index', {
    project_name: req.params.project,
    page_title: req.params.page
  })
});


