// const Game = require('./game.js');
// const Player = require('./player.js');
// const { get, getAll, createEl } = require('./util/utilities.js');

let game;
const domMethods = {
  render,
  showAnswers,
  updateBoard,
  createPlayerArea,
  createQuitButton,
  resetGame,
  clearScreen,
  transitionToGame
}

/*
  NEED TO USE GAME.UPDATE ONLY TO UPDATE GAME
*/
console.error('NEED TO USE GAME.UPDATE ONLY TO UPDATE GAME')
get('#start-btn').addEventListener('click', transitionToGame);
// get('#game-board').addEventListener('click', render);

function render(event) {
  let target = event.target;

  if (target.closest('.clue') && target.closest('.clue').dataset.id) {

    if (target.dataset.id) {
      let clueId = target.dataset.id;

      if (game.data[clueId].isDailyDouble) {
        showWager(clueId);

      } else {
        showAnswers(clueId);
      }
    }
  }

  if (target.closest('.answerContainer')) {
    let clueId = target.closest('.clue').dataset.id;
    const playerArea = get('#player-area');
    game.update(clueId, target.innerText);
    clearPlayerArea();
    updatePlayers(playerArea);

  }
}

function showWager(clueId) {
  let wagerContainer;
  let tempElement;
  let tempBox;

  let clueContainer = get(`.clue[data-id="${clueId}"]`);

  tempElement = createEl('h1');
  tempElement.innerText = 'Wager';
  tempElement.classList.add('daily-double')
  wagerContainer = createEl('div');
  wagerContainer.classList.add('wager');
  wagerContainer.append(tempElement);

  tempElement = createEl('section');

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '5';
  tempElement.append(tempBox);

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '10';
  tempElement.append(tempBox);

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '100';
  tempElement.append(tempBox);

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '1000';
  tempElement.append(tempBox);
  wagerContainer.append(tempElement);

  tempElement = createEl('section');

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '-5';
  tempElement.append(tempBox);

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '-10';
  tempElement.append(tempBox);

  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '-100';
  tempElement.append(tempBox);


  tempBox = createEl('span');
  tempBox.classList.add('number');
  tempBox.innerText = '-1000';
  tempElement.append(tempBox);
  wagerContainer.append(tempElement);


  tempElement = createEl('section');

  tempBox = createEl('span');
  tempBox.classList.add('wager-range');
  tempBox.innerText = 'min: 5';
  tempElement.append(tempBox);
  wagerContainer.append(tempElement);

  tempBox = createEl('button');
  tempBox.id = 'wager-amount';
  tempBox.innerText = '0';
  tempElement.append(tempBox);
  wagerContainer.append(tempElement);


  tempBox = createEl('span');
  tempBox.classList.add('wager-range');
  tempBox.innerText = 'max: 9999';
  tempElement.append(tempBox);
  wagerContainer.append(tempElement);






  clueContainer.innerHTML = '';
  clueContainer.append(wagerContainer);
  get('#wager-amount').addEventListener('click', () => {
    clueContainer.innerHTML = '';
    showAnswers(clueId)
  });
  // looking to add interaction??
  [...getAll('.number')].forEach((wagerNum) => {
    wagerNum.addEventListener('click', (e) => {
      const selectedAmt = parseInt(e.target.innerText);
      const submitAmount = parseInt(get('#wager-amount').innerText);
      const newAmount = submitAmount + selectedAmt;
      get('#wager-amount').innerText = newAmount;
      game.data[clueId].value = newAmount;
    })
  })


}

function showAnswers(clueId) {
  let clue = get(`.clue[data-id="${clueId}"]`);
  let answerContainer;
  let answerElement;
  let continueBtn;
  let answer = game.data[clueId].answer;

  // will need this when questions are full screen
  // let cat = game.data[clueId].category;



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

//update
function updateBoard() {
  let updateBoard = game.board.createBoard();
  if (get('#game-board')) get('#game-board').remove();

  get('#view').append(updateBoard);
  get('#game-board').addEventListener('click', render);
}

function createPlayerArea() {
  let playerArea = createEl('section');
  playerArea.id = 'player-area';
  get('#view').append(playerArea);
  updatePlayers(playerArea);
}

function updatePlayers(playerArea) {

  game.players.forEach((player, i) => {
    let user = createEl('article');
    let { name, score } = player;
    user.classList.add(`player-${i}`);
    user.innerText = `${name} score: ${score}`;
    playerArea.append(user);
  });
}
function clearPlayerArea() {
  get('#player-area').innerHTML = '';
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
function showGame() {

}
function showPlayerScores() {
  const playerOneName = get('#p1-name-input').value;
  const playerTwoName = get('#p2-name-input').value;
  const playerThreeName = get('#p3-name-input').value;

  return [playerOneName, playerTwoName, playerThreeName];
}

function transitionToGame() {
  const [playerOneName, playerTwoName, playerThreeName] = showPlayerScores();

  // transition img below
  get('#view').innerHTML = '<img src="./img/loading.gif">';

  // timeout is to display the transition screen
  window.setTimeout(() => {
    game = new Game([playerOneName, playerTwoName, playerThreeName]);
    clearScreen();
    createPlayerArea();
    updateBoard();
    createQuitButton();
  }, 500);
}

function removeHide(e) {
  if (e.classList.contains('hide')) {
    e.classList.remove('hide');
  } else {
    
    e.classList.add('hide');
  }
  console.log(e);
}

if (typeof module !== 'undefined') {
  module.exports = game;
}