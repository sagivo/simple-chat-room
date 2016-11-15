$(() => {
  document.querySelector('#connect').addEventListener('click', () => {
    document.querySelector('#looking').style.display = '';
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((err, stream) => {
      const p = new SimplePeer({
        initiator: document.querySelector('#inRoom').innerText === '',
        trickle: false,
        stream: stream
      });

      p.on('error', function (err) { console.log('peer error', err) });

      p.on('signal', function (data) {
        console.log('you are', data);
      })

      // document.querySelector('form').addEventListener('submit', function (ev) {
      //   p.signal(JSON.parse(document.querySelector('#to').value));
      //   ev.preventDefault();
      // })

      // p.on('connect', function () {
      //   const num = Math.random();
      //   console.log('CONNECT sending ' + num)
      //   p.send(num)
      // })

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