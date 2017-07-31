const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));
app.use('/dawiki-wiki', express.static(__dirname + '/dawiki-wiki'));
// app.use('/dawiki-wiki/dist', express.static('dawiki-wiki/dist'));
// app.use('/dawiki-wiki/src', express.static('dawiki-wiki/src'));
// app.use('/dawiki-wiki/dawiki-head', express.static('dawiki-wiki/dawiki-head'));
// app.use('/dawiki-wiki/dawiki-line', express.static('dawiki-wiki/dawiki-line'));
// app.use('/dawiki-wiki/dawiki-paper', express.static('dawiki-wiki/dawiki-paper'));
// app.use('/dawiki-wiki/dawiki-wiki', express.static('dawiki-wiki/dawiki-wiki'));

// Settings for ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

http.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
});

app.get('/:project/:page', function (req, res) {
  res.render('index', {
    project_name: req.params.project,
    page_title: req.params.page
  })
});

