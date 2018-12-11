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
  
  if (event.target.dataset.id) {
    showAnswerOrWager(event.target.dataset.id);
  }

  if (event.target.closest('.answerContainer')) {
    let clueId = event.target.closest('.clue').dataset.id;
    
    game.update(clueId, event.target.innerText);
    clearPlayerArea();
    updatePlayers(get('#player-area'));
  }
}
function showAnswerOrWager(clueId) {
  if (game.data[clueId].isDailyDouble) {
    showWager(clueId);
  } else {
    showAnswers(clueId);
  }
}

function showWager(clueId) {
  let posValues = [5, 10, 100, 1000];
  let negValues = [-5, -10, -100, -1000];

  let clueContainer = get(`.clue[data-id="${clueId}"]`);

  clueContainer.innerHTML = '';
  clueContainer.append(createWagerArea(posValues, negValues));
  
  get('#wager-amount').addEventListener('click', () => {
    clueContainer.innerHTML = '';
    showAnswers(clueId)
  });

  [...getAll('.number')].forEach((wagerNum) => {
    wagerNum.addEventListener('click', (e) => {
      const selectedAmt = parseInt(e.target.innerText);
      const submitAmount = parseInt(get('#wager-amount').innerText);
      
      get('#wager-amount').innerText = submitAmount + selectedAmt;
      game.data[clueId].value = submitAmount + selectedAmt;
    })
  })
}

function createWagerArea(positives, negatives) {
  let wagerContainer;
  let tempElement;

  wagerContainer = createElementWith('div', '.wager');
  wagerContainer.append(createElementWith('h1', '.daily-double', 'Wager'));

  tempElement = createElementWith('section', '.ans-pos-box');
  wagerContainer.append(createWagerValueBox(tempElement, positives));

  tempElement = createElementWith('section', '.ans-neg-box');
  wagerContainer.append(createWagerValueBox(tempElement, negatives));

  tempElement = createElementWith('section', '.range-submit');
  tempElement.append(createElementWith('span', '.wager-range', 'min: 5'));
  wagerContainer.append(tempElement);

  tempElement.append(createElementWith('button', '#wager-amount', '0'));
  wagerContainer.append(tempElement);

  tempElement.append(createElementWith('span', '.wager-range', 'max: 9999'));
  wagerContainer.append(tempElement);

  return wagerContainer;
}

function createWagerValueBox(element, arr) {
  arr.forEach((value) => {
    element.append(createElementWith('span', '.number', value));
  });
  return element;
}

function showAnswers(clueId) {
  let clue = get(`.clue[data-id="${clueId}"]`);
  let answerContainer;
  let answer = game.data[clueId].answer;

  // will need this when questions are full screen
  // let cat = game.data[clueId].category;
  // let question = game.data[clueId].question;
  // get(`.clue[data-id="${clueId}"]`).innerHTML = question;
  
  answerContainer = createElementWith('div', '.answerContainer');
  answerContainer.append(createElementWith('div', '.answer', answer));
  answerContainer.append(createElementWith('div', '.answer', 'yo'));
  answerContainer.append(createElementWith('div', '.answer', 'sup'));
  answerContainer.append(createElementWith('div', '.answer', 'foo'));
  clue.append(answerContainer);

  clue.append(createElementWith('button', '.contBtn', 'Continue'));
}

function updateBoard() {
  let updateBoard = game.board.createBoard();
  if (get('#game-board')) get('#game-board').remove();

  get('#view').append(updateBoard);
  get('#game-board').addEventListener('click', render);
}

function createPlayerArea() {
  let playerArea = createElementWith('section', '#player-area');

  get('#view').append(playerArea);
  updatePlayers(playerArea);
}

function updatePlayers(playerArea) {

  game.players.forEach((player, i) => {
    let { name, score } = player;
    let user = createElementWith('article', `.player-${i}`, `${name} score: ${score}`);
    playerArea.append(user);
  });
}
function clearPlayerArea() {
  get('#player-area').innerHTML = '';
}

function createQuitButton() {
  get('#view').append(createElementWith('article', '#quit', 'QUIT'));
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