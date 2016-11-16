const User = require('./User');
let rooms = [];

class Room {
  static byName(roomName) {
    let room = rooms[roomName];
    if (!room) {
      room = new Room(roomName);
    }
    return room;
  }

  static reset() {
    rooms = [];
    console.log(rooms);
  }

  constructor(name) {
    this.name = name;
  }

  addUser(user) {
    if (this.isFull) return false;
    if (this.u1) this.u2 = user;
    else this.u1 = user;
    rooms[this.name] = this;
    return true;
  }

  removeUser(user) {
    if (this.u1 === user) this.u1 = null;
    else this.u2 = null;
  }

  get isFull(){
    return this.u2;
  }

}

module.exports = Room;