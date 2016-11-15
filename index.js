const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { message: 'Hello there!' })
})

const port = 8080;

app.listen(port, function () {
  console.log(`Example app listening on port ${ port }`)
})