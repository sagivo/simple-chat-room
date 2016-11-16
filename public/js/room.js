const roomName = document.querySelector('#room').innerText;
const inRoom = document.querySelector('#inRoom');

$(() => {
  document.querySelector('#connect').addEventListener('click', () => {
    document.querySelector('#looking').style.display = '';
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      console.log(stream);
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
        console.log('signal from ' + userName);
        socket.emit('got signal', { signal });
      });

      socket.on('contact user', function (user) {
        console.log('contact user ' + user.name);
        p.signal(user.signal.signal);
      });

      socket.on('user left', function (user) {
        console.log('user left :(', user);
      });

      p.on('connect', function () {
        console.log('CONNECTed!!!!')
        // p.send(num)
      })

      // p.on('data', function (data) {
      //   console.log('data: ' + data);
      // })


      p.on('stream', function (stream) {
        console.log('streammmm!!!');
        const video = document.querySelector('#video')
        console.log('stream!');
        video.src = window.URL.createObjectURL(stream)
        video.play();
      });
    })
  });
});