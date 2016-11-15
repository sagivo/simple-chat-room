const express = require('express');
const app = express();
const rooms = {};
const Room = require('./classes/Room');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { message: 'Hello there!' });
})

app.get('/chat', function (req, res) {
  let room = rooms[req.query.room];
  if (!room) {
    room = new Room(req.query.room);
  }
  res.render('room', { room });
});

const port = 8080;

app.listen(port, function () {
  console.log(`Example app listening on port ${ port }`);
});
