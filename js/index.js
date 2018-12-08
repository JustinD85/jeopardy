import { Game } from './game.js';
import { Player } from './player.js';
import {get, getAll, createEl} from './util/utilities.js'

let game;
const domMethods = {
  render
}

get('#start-btn').addEventListener('click', transitionToGame );
// get('#game-board').addEventListener('click', render);

function render(event) {
  let target = event.target;

  if (target.closest('.clue') && target.closest('.clue').dataset.id) {
    if (target.dataset.id) {
      let clueId = target.dataset.id;
      selectClue(clueId);
    }
  }

  if (target.closest('.answerContainer')) {
    let clueId = target.closest('.clue').dataset.id;
    let answer = game.checkAnswer(clueId, target.innerText);
    console.log(answer)
    //update score


  }
}

function selectClue(clueId) {
  let clue = get(`.clue[data-id="${clueId}"]`);
  let answerContainer;
  let answerElement;
  let continueBtn;
  let answer = game.data[clueId].answer;
  let cat = game.data[clueId].category;

  // let question = game.data[clueId].question;

  // get(`.clue[data-id="${clueId}"]`).innerHTML = question;
  answerContainer = createEl('div')
  answerContainer.classList.add('answerContainer');
  
  answerElement = createEl('div');
  answerElement.innerText = answer;
  answerContainer.append(answerElement);

  answerElement = createEl('div')
  answerElement.innerText = 'yo';
  answerContainer.append(answerElement);
  
  answerElement = createEl('div')
  answerElement.innerText = 'sup';
  answerContainer.append(answerElement);
  
  answerElement = createEl('div')
  answerElement.innerText = 'foo';
  answerContainer.append(answerElement);

  clue.append(answerContainer);

  continueBtn = createEl('button');
  continueBtn.innerText = 'Continue';
  clue.append(continueBtn);
}


function createBoard() {
  let tempGameBoard = createEl('main');

  tempGameBoard.id = 'game-board';
  get('#view').append(tempGameBoard);
  
  for (let i = 0, id = 0; i < 5; i++) {
    let column = createEl('section');
    column.classList.add('category');
  
    for (let j = 0; j < 5; j++) {
      let row = createEl('article');
  
      if (j === 0) {
        row.classList.add('clue');
        row.innerHTML = `<h1>${game.data[id].category}</h1>`;
      } else {
        row.classList.add('clue');
        row.dataset.id = `${id}`;
        row.innerHTML = `<h1> ${game.data[id].value}</h1>`;
        id++;
      }
      column.append(row);
    }
    
    get('#game-board').append(column);
    get('#game-board').addEventListener('click', render);
  }
}

function createPlayerArea() {
  let playerList = createEl('section');
  playerList.classList.add('player-area');
  
  game.players.forEach((player, i) => {
    let user = createEl('article');
    let { name, score } = player;
    user.classList.add(`player-${i}`);
    user.innerText = `${name} score: ${score}`;
    playerList.append(user);
  });
  get('#view').append(playerList);
}

function createQuitButton() { 
  let quitBtn = createEl('article');
  quitBtn.id = 'quit';
  quitBtn.innerText = 'QUIT';
  get('#view').append(quitBtn);
  get('#quit').addEventListener('click', resetGame);
}

function resetGame() {
  location.reload();
}
function clearScreen() {
  get('#view').innerHTML = '';
}
function transitionToGame() {
  const playerOneName = get('#p1-name-input').value;
  const playerTwoName = get('#p2-name-input').value;
  const playerThreeName = get('#p3-name-input').value;

  // transition img below
  get('#view').innerHTML = '<img src="./img/loading.gif">';

  // timeout is to display the transition screen
  window.setTimeout(() => {
    game = new Game([playerOneName, playerTwoName, playerThreeName]);
    clearScreen();
    createPlayerArea();
    createBoard();
    createQuitButton();
  }, 500);   
}
