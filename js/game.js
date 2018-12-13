class Game {
  constructor(inPlayers) {
    this.round = 1;
    this.players = inPlayers.map((name) => new Player(name));
    this.board = new Board();
    this.dataManager = new DataManager();
    this.canClickClue = true;
    this.finalContestants = 0;
  }

  update(clueId, playerGuess) {
    const isCorrect = this.checkAnswer(clueId, playerGuess);
    this.dataManager.data[clueId].available = false;
    this.canClickClue = true;
    this.updatePlayerScore(isCorrect, clueId);
    this.rotateCurrentPlayer();
    this.updateRound();
    this.determineWinner();
  }

  getAllCluesByCategoryId(categoryId, clueId) {
    let matchingClues = this.dataManager.sourceData.clues.filter((clue) => clue.categoryId === categoryId);
    let correctAnswer = this.dataManager.data[clueId].answer;

    matchingClues = matchingClues.filter(clue => clue.answer !== correctAnswer);
    matchingClues = this.dataManager.randomizeArray(matchingClues);

    return matchingClues.splice(-3).map(clue => clue.answer);
}

  checkAnswer(clueId, playerGuess) {
    const correctAnswer = this.dataManager.data[clueId].answer;
    
    return playerGuess === correctAnswer;

  }

  updateFinalWager(shouldIncrement) {
    if (shouldIncrement) {
      this.players[0].finalWager += this.players[0].score;
    } else {
      this.players[0].finalWager -= this.players[0].score;
    }
  }
  
  updatePlayerScore(shouldIncrement, clueId) {
    if (shouldIncrement) {
      this.players[0].score += this.dataManager.data[clueId].value;
    } else {
      this.players[0].score -= this.dataManager.data[clueId].value;
    }
  }

  rotateCurrentPlayer() {
    this.players.push(this.players.shift());
  }

  determineWinner() {
    
    return this.players.sort(function (a, b) {
      return b.finalWager - a.finalWager;
    })
  }

  updateRound() {
    let cluesAvailable = false;

    let checkClueAvailability = (min, max, shouldIncrement) => {
      for (let i = min; i < max; i++) {
        if (!cluesAvailable) {
          cluesAvailable = this.dataManager.data[i].available;
        }
      }
      if (!cluesAvailable || shouldIncrement) {
        this.round++;
      }
    }

    switch (this.round) {
      case 1: checkClueAvailability(0, 16);
        break;
      case 2: checkClueAvailability(0, 32);
        break;
      case 3: checkClueAvailability(0, 33, false);
        break;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Game;
}