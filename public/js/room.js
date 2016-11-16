const roomName = document.querySelector('#room').innerText;
const inRoom = document.querySelector('#inRoom');

$(() => {
  document.querySelector('#connect').addEventListener('click', () => {
    document.querySelector('#looking').style.display = '';
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((err, stream) => {
      const socket = io();
      const userName = document.querySelector('#userName').value;

      socket.emit('user ready', { roomName, userName });

      const p = new SimplePeer({
        initiator: inRoom.innerText === '',
        trickle: false,
        stream: stream
      });

      p.on('error', function (err) { console.log('peer error', err) });

      p.on('signal', function (signal) {
        console.log('signal from' + userName);
        socket.emit('got signal', { signal });
      });

      socket.on('new user', function (user) {
        const node = document.createElement("li");
        node.innerText = (inRoom.innerText === '' ? '' : ', ') + user.name;
        inRoom.appendChild(node);
        console.log(user.name + ' joined!!!');
      });

      socket.on('connect to', function (users) {
        console.log('connect to', users, users[0].signal);
        p.signal(users[0].signal.signal);
      });

      socket.on('user left', function (user) {
        console.log('user left :(', user);
      });

      // document.querySelector('form').addEventListener('submit', function (ev) {
      //   p.signal(JSON.parse(document.querySelector('#to').value));
      //   ev.preventDefault();
      // })

      p.on('connect', function () {
        console.log('CONNECTed')
        // p.send(num)
      })

      // p.on('data', function (data) {
      //   console.log('data: ' + data);
      // })


      p.on('stream', function (stream) {
        const video = document.querySelector('#video')
        console.log('stream!');
        video.src = window.URL.createObjectURL(stream)
        video.play();
      });
    })
  });
});