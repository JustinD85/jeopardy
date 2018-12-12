class Game {
  constructor(inPlayers) {
    this.round = 1;
    this.players = inPlayers.map((name) => new Player(name));
    this.board = new Board();
    this.data = new DataManager();
    this.canClickClue = true;
  }

  update(clueId, playerGuess) {
    const isCorrect = this.checkAnswer(clueId, playerGuess);
    this.data[clueId].available = false;
    this.canClickClue = true;
    this.updatePlayerScore(isCorrect, clueId);
    this.rotateCurrentPlayer();
    this.updateRound();
    this.determineWinner();
  }

  checkAnswer(clueId, playerGuess) {
    const correctAnswer = this.data[clueId].answer;
    
    return playerGuess === correctAnswer;

  }
  
  updatePlayerScore(shouldIncrement, clueId) {
    if (shouldIncrement) {
      this.players[0].score += this.data[clueId].value;
    } else {
      this.players[0].score -= this.data[clueId].value;
    }

  }

  rotateCurrentPlayer() {
    this.players.push(this.players.shift());
  }

  determineWinner() {

  }

  updateRound() {
    let bool = false;
    if (this.round  === 1) {
      for (let i = 0; i < 16; i++) {
        if (!bool) {
          bool = this.data[i].available;
        }
      }

      if (!bool) {
        console.error("2nd Round");
        this.round++;
        updateBoard();
      } 
    }

    if (this.round === 2) {
      for (let i = 0; i < 32; i++) {
        if (!bool) {
          bool = this.data[i].available;
        }
      }

      if (!bool) {
        console.error('final round')
        this.round++;
        updateBoard();
      } 
    }

    if (this.round === 3) {
      for (let i = 0; i < 33; i++) {
        if (!bool) {
          bool = this.data[i].available;
        }
      }

      if (!bool) {
        console.error("Game Over");
        updateBoard();
      } 

    }
  }

  
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}