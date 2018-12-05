import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';

export class Game{
  constructor() {
    this.round = 0;
    this.players = [];
    this.board = new Board();
    this.data = [];
  }

  start(users) {
    console.log('Game Started!');
    this.players = users;
  }

  setUpBoard(inDOMBoard) {
    this.board.populate(inDOMBoard);
  }

  checkAnswer() {
    
  }

  updatePlayerScore(clueId) {
    
  }

  rotateCurrentPlayer() {
    
  }

  determineWinner() {
    
  }

  updateRound() {
    
  }

  quit() {
    
  }

}