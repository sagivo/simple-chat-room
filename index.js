const express = require('express');
const Room = require('./classes/Room');
const User = require('./classes/User');

const app = express();
const rooms = {};

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index', { message: 'Hello there!' });
})

app.get('/chat', function(req, res) {
  const room = Room.byName(req.query.room);
  res.render('room', { room });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, function() {
  console.log(`Example app listening on port ${ port }`);
});


const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  console.log('ok');

  socket.on('user ready', (data) => {
    const user = new User(data.userName, socket.id);
    const room = Room.byName(data.roomName);
    room.addUser(user);
    socket.room = room;
    socket.user = user;
    if (room.u2 === user) {
      console.log('contacting u2 -> u1');
      socket.emit('contact user', room.u1);
    }
  });

  socket.on('got signal', (signal) => {
    socket.user.addSignal(signal);
    if (socket.room.isFull) {
      console.log('contacting u1 -> u2');
      socket.broadcast.to(socket.room.u1.socketId).emit('contact user', socket.room.u2);
    }
  });

  socket.on('disconnect', () => {
    console.log('bye');
    socket.room = null;
    Room.reset();
  });
});
