const Person = require('./Person');

class Room {
  constructor(name) {
    this.name = name;
    this.people = [];
    this.max = 2;
  }

  addPerson(person) {
    if (!this.isFull) this.people.push(person);
  }

  get isFull() {
    this.max >= this.people.length;
  }
}

module.exports = Room;