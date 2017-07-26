const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/dawiki-wiki', express.static('dawiki-wiki'));

http.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});