import { DataManager } from './dataManager.js';
import { Board } from './board.js';
import { Clue } from './clue.js';
import { Wager } from './wager.js';
import { get, getAll, createEl } from './util/utilities.js';

export class Game {
  constructor(inPlayers) {
    this.round = 0;
    this.players = inPlayers;
    this.board = new Board();//think about have this as an MAP or Object
    this.data = {
      0: { category: 'Mail', question: 'stuff' },
      1: { category: 'Mail', question: 'Mail question' },
      2: { category: 'Mail', question: 'Mail question' },
      3: { category: 'Mail', question: 'Mail question' },
      4: { category: 'Cola', question: 'Does it taste great' },
      5: { category: 'Cola', question: 'Cola Question' },
      6: { category: 'Cola', question: 'Cola Question' },
      7: { category: 'Cola', question: 'Cola Questionf' },
      8: { category: 'Desk', question: 'Can I sit' },
      9: { category: 'Desk', question: 'Desk question' },
      10: { category: 'Desk', question: 'Desk question' },
      11: { category: 'Desk', question: 'Desk question' },
      12: { category: 'Panda', question: 'black and white' },
      13: { category: 'Panda', question: 'Panda question' },
      14: { category: 'Panda', question: 'Panda question' },
      15: { category: 'Panda', question: 'Panda question' },
      16: { category: 'Robert', question: 'Random Person' },
      17: { category: 'Robert', question: 'Robert question' },
      18: { category: 'Robert', question: 'Robert question' },
      19: { category: 'Robert', question: 'Robert question' }
    };
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

    
    for (let i = 0, clueId = 0; i < 5; i++) {
      let column = createEl('section');
      column.classList.add('category');
      
      for (let j = 0; j < 5; j++) {
        let row = createEl('article');

        if (j === 0) {
          row.classList.add('clue');
          row.innerHTML = `<h1>${this.data[clueId].category}</h1>`;
        } else {
          row.classList.add('clue');
          row.dataset.id = `${clueId}`;
          row.innerHTML = `<h1> ${this.data[clueId].question}</h1>`;
          clueId++;
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