import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';
import { get, getAll, createEl } from './util/utilities.js';

export class Game {
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

  render() {
    let tempGameBoard = createEl('main');

    tempGameBoard.classList.add('game-board');
    get('#view').append(tempGameBoard);

    for (let i = 0; i < 5; i++) {
      let column = createEl('section');
      column.classList.add('category');

      for (let j = 0; j < 5; j++) {
        let row = createEl('article');

        row.classList.add('clue');
        column.append(row);
      }

      get('.game-board').append(column);
    }

    console.log(get('#view'));
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