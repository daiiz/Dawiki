const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);

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

app.get('/:project/:page', function (req, res) {
  res.render('index', {
    project_name: req.params.project,
    page_title: req.params.page
  })
});

