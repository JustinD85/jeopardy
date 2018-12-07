import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';
import { get, getAll, createEl } from './util/utilities.js';

export class Game {
  constructor(inPlayers) {
    this.round = 0;
    this.players = inPlayers;
    this.board = new Board();
    this.data = new DataManager();

    this.render();
    
  }

  start() {
    console.log('Game Started!');
  }

  render() {
    let tempGameBoard = createEl('main');
    get('#view').innerHTML = ''; // clearing

    tempGameBoard.classList.add('game-board');
    get('#view').append(tempGameBoard);

    
    for (let i = 0, id= 0; i < 5; i++) {
      let column = createEl('section');
      column.classList.add('category');
      
      for (let j = 0; j < 5; j++) {
        let row = createEl('article');
        
        if (j === 0) {
          row.classList.add('clue');
          row.innerHTML = `<h1>${this.data[id].category}</h1>`;
        } else {
          row.classList.add('clue');
          row.dataset.id = `${id}`;
          row.innerHTML = `<h1> ${this.data[id].value}</h1>`;
          id++;
        }
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