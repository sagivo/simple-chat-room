const express = require('express');
const Room = require('./classes/Room');
const User = require('./classes/User');

const app = express();
const rooms = {};

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { message: 'Hello there!' });
})

app.get('/chat', function (req, res) {
  const room = Room.byName(req.query.room);
  res.render('room', { room });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
  console.log(`Example app listening on port ${ port }`);
});

const io = require('socket.io').listen(server);
io.on('connection', function(socket){

  socket.on('user ready', (data) => {
    console.log('user ready');
    const user = new User(data.userName, socket.id);
    const room = Room.byName(data.roomName);
    room.addUser(user);
    socket.room = room;
    socket.user = user;
    socket.join(room.name);
    io.to(room.name).emit('new user', user);
  });

  socket.on('got signal', (signal) => {
    socket.user.addSignal(signal);
    const activeUsers = Object.keys(socket.room.users)
      .map(userName => socket.room.users[userName])
      //.filter(u => u.signal);
    console.log('activeUsers', activeUsers);
    if (activeUsers.length > 1) {
      for (const u of activeUsers) {
        const otherUsers = activeUsers.filter(us => us.name != u.name && us.signal);
        console.log('u.socketId', u, u.socketId);
        socket.broadcast.to(u.socketId).emit('connect to', otherUsers);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('bye');
    if (socket.room) {
      socket.room.removeUser(socket.user);
    }
    io.to(socket.room.name).emit('user left', socket.user);
  });
});
