class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.finalWager = 0;
  }

  incrementFinalWager() {
    this.finalWager += this.score;
  }  
  
  decrementFinalWager() {
    this.finalWager -= this.score;
  }  

  incrementScore(amount) {
    this.score += amount;
  }
  decrementScore(amount) {
    this.score -= amount;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Player;
}