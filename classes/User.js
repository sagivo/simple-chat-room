class User {
  constructor(name, socketId) {
    this.name = name;
    this.socketId = socketId;
  }

  addSignal(signal) {
    this.signal = signal;
  }

  addSocket(socket) {
    this.socket = socket;
  }
}

module.exports = User;