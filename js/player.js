class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}