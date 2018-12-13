class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.finalWager = 0;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}