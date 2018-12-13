class Game {
  constructor(inPlayers) {
    this.round = 1;
    this.players = inPlayers.map((name) => new Player(name));
    this.board = new Board();
    this.dataManager = new DataManager();
    this.clues = this.dataManager.formatData();
    this.finalContestants = 0;
  }

  update(clueId, playerGuess) {
    const isCorrect = this.checkAnswer(clueId, playerGuess);
    this.clues[clueId].available = false;
    this.updatePlayerScore(isCorrect, clueId);
    this.rotateCurrentPlayer();
    this.updateRound();
    this.determineWinner();
  }

  getAllCluesByCategoryId(categoryId, clueId) {
    let matchingClues = this.dataManager.sourceData.clues.filter((clue) => clue.categoryId === categoryId);
    let correctAnswer = this.clues[clueId].answer;

    matchingClues = matchingClues.filter(clue => clue.answer !== correctAnswer);
    matchingClues = this.dataManager.randomizeArray(matchingClues);

    return matchingClues.splice(-3).map(clue => clue.answer);
  }

  checkAnswer(clueId, playerGuess) {
    return this.clues[clueId].isCorrect(playerGuess);
  }
  
  updateFinalWager(shouldIncrement) {
    if (shouldIncrement) {
      this.getCurrentPlayer().incrementFinalWager();
    } else {
      this.getCurrentPlayer().decrementFinalWager();
    }
  }

  getCurrentPlayer() {
    return this.players[0];
  }

  updatePlayerScore(shouldIncrement, clueId) {
    const pointValue = this.clues[clueId].value;

    if (shouldIncrement) {
      this.getCurrentPlayer().incrementScore(pointValue);
    } else {
      this.getCurrentPlayer().decrementScore(pointValue);
    }
  }

  rotateCurrentPlayer() {
    let profilePhotos = this.dataManager.imgs;

    profilePhotos.push(profilePhotos.shift())
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
          cluesAvailable = this.clues[i].available;
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