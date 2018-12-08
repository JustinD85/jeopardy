import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';
import { get, getAll, createEl } from './util/utilities.js';
import { Player } from './player.js';

export class Game {
  constructor(inPlayers) {
    this.round = 0;
    this.players = inPlayers.map((name) => new Player(name));
    this.board = new Board();
    this.data = new DataManager();
  }

  update() {

  }

  checkAnswer() {

  }
  
  updatePlayerScore(clueId) {
    this.players[0].score += this.data[clueId].value;

  }

  rotateCurrentPlayer() {

  }

  determineWinner() {

  }

  updateRound() {

  }


}