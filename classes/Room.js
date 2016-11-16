const User = require('./User');
const rooms = [];

class Room {
  static byName(roomName) {
    let room = rooms[roomName];
    if (!room) {
      room = new Room(roomName);
    }
    return room;
  }

  constructor(name) {
    this.name = name;
    this.users = {};
    this.max = 2;
  }

  addUser(user) {
    if (this.isFull || this.users[user.name]) return false;
    this.users[user.name] = user;
    rooms[this.name] = this;
    return true;
  }

  removeUser(user) {
    delete this.users[user.name];
  }

  get isFull(){
    this.max >= this.users.length;
  }

}

module.exports = Room;