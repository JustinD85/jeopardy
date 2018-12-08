import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';
import { get, getAll, createEl } from './util/utilities.js';
import { Player } from './player.js';

export class Game {
  constructor(inPlayers) {
    this.round = 1;
    this.players = inPlayers.map((name) => new Player(name));
    this.board = new Board();
    this.data = new DataManager();
  }

  update(clueId, playerGuess) {
    const isCorrect = this.checkAnswer(clueId, playerGuess);
    this.data[clueId].available = false;
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
    
    for (let i = 0; i < 20; i++) {
      if (!bool) {
        bool = this.data[i].available;
      }
    }

    if (!bool) {
      this.round++;
    }
  }
}