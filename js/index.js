const domMethods = {
  addTextOrHTML,
  buildClueBox,
  updatePlayers,
  changeGameMessage,
  clearScreen,
  createBoard,
  createElWithClass,
  createElWithId,
  createPlayerArea,
  createQuitButton,
  createWagerArea,
  buildWagerValueBox,
  render,
  resetGame,
  showAnswerOrWager,
  showAnswers,
  showFinalRound,
  showWager,
  transitionToGame,
  updateBoard
}

function render(event) {
  let targetOfClue = event.target.parentElement.dataset.id;
  let targetOfAnswer = event.target.closest('.answer-container');
  const isRoundOneOrTwo = targetOfClue && game.round < 3;

  if (isRoundOneOrTwo) {
    $("#game-board").hide();
    showAnswerOrWager(targetOfClue);
  }

  if (targetOfAnswer) {
    game.update(event.target.id, event.target.innerText);
    clearScreen();
    createPlayerArea();
  }

  if (targetOfAnswer && game.round < 3) {
    updateBoard();
  } else if (game.round === 3) {
    showFinalRound();
  }
}

function changeGameMessage(msg) {
  $('#info').text(msg);
}

function showFinalRound() {
  changeGameMessage(`Final Round! ${game.players[0].name} choose your wager!`)
  let view = $(`#view`);
  $("#player-area").hide();
  $(".question").hide();
  $("#game-board").hide();
  
  view.append(createWagerArea());

  $("#wager-amount").on("click", () => {
    if (!game.players[1].finalWager) {
      changeGameMessage(`Great! Now it's ${game.players[1].name}'s turn to choose!`)
      game.rotateCurrentPlayer();
    } else {
      game.rotateCurrentPlayer();
      showAnswers(buildClueBox(32), 32);
    }
  });
  [...document.querySelectorAll('.number')].forEach((wagerNum) => {
    wagerNum.addEventListener('click', (e) => {
      const selectedAmt = parseInt(e.target.innerText);
      const submitAmount = parseInt($("#wager-amount").text());
      const desiredAMount = submitAmount + selectedAmt;
      const currentMax = parseInt($('.wager-max').text());
      if (desiredAMount < currentMax) {
        $("#wager-amount").text(submitAmount + selectedAmt);
        game.players[0].finalWager = submitAmount + selectedAmt;
      } else {
        $("#wager-amount").text(currentMax);
        game.players[0].finalWager = currentMax;
      }
    })
  })
}

function showAnswerOrWager(clueId) {
  let clueBox = buildClueBox(clueId);

  let clickedClueID = game.clues[clueId];
  if (clickedClueID instanceof Wager) {
    changeGameMessage(`Press a Positive or Negative number to Change your wager!`)
    showWager(clueId);
  } else {
    showAnswers(clueBox, clueId);
  }
}

function showWager(clueId) {

  let view = $(`#view`);

  $(".question-container").hide();
  view.append(createWagerArea(clueId));

  $("#wager-amount").on("click", () => {
    showAnswers(buildClueBox(clueId), clueId);
  });

  [...document.querySelectorAll('.number')].forEach((wagerNum) => {
    wagerNum.addEventListener('click', (e) => {
      const selectedAmt = parseInt(e.target.innerText);
      const submitAmount = parseInt($("#wager-amount").text());
      const desiredAMount = submitAmount + selectedAmt;
      
      const currentMax = parseInt($('.wager-max').text());
      if (desiredAMount < 0) {
        game.clues[clueId].value = 5;
      } else if (desiredAMount < currentMax) {
        $("#wager-amount").text(submitAmount + selectedAmt);
        game.clues[clueId].value = submitAmount + selectedAmt;
      } else {
        $("#wager-amount").text(currentMax);
        game.clues[clueId].value = currentMax;
      }
    })
  })
}

function buildClueBox(clueId) {
  let clueBox;
  let clue = game.clues[clueId];
  clueBox = createElWithClass('div', `.question-container`);
  clueBox.append(createElWithClass('h3', '.category', clue.category));
  clueBox.append(createElWithClass('h3', '.point-value', clue.value));
  clueBox.append(createElWithClass('h3', '.question', clue.question));

  $("#view").append(clueBox);
  return clueBox;
}

function createWagerArea(clueId = 32) {
  let positives = [5, 10, 100, 1000];
  let negatives = [-5, -10, -100, -1000];
  let cluePointValue = game.clues[clueId].value;
  let dailyDouble;
  let tempElement;
  let maxValue = game.players[0].score;

  if (cluePointValue > maxValue) {
    maxValue = cluePointValue;
  }

  dailyDouble = createElWithClass('div', '.wager-container');
  if (game.round < 3) {
    dailyDouble.append(createElWithClass('h1', '.wager-title', 'Daily Double! \n Please input a wager'));
  } else {
    dailyDouble.append(createElWithClass('h1', '.wager-title', 'Final Jeopardy! \n Please input a wager'));
  }

  tempElement = createElWithClass('section', '.ans-pos-box');
  dailyDouble.append(buildWagerValueBox(tempElement, positives));

  tempElement = createElWithClass('section', '.ans-neg-box');
  dailyDouble.append(buildWagerValueBox(tempElement, negatives));

  tempElement = createElWithClass('section', '.range-submit');
  tempElement.append(createElWithClass('span', '.wager-min', '5'));
  dailyDouble.append(tempElement);

  tempElement.append(createElWithId('button', '#wager-amount', '0'));
  dailyDouble.append(tempElement);

  if (maxValue <= 0) {
    maxValue = 5;
  }
  tempElement.append(createElWithClass('span', '.wager-max', `${maxValue}`));
  dailyDouble.append(tempElement);

  return dailyDouble;
}

function buildWagerValueBox(element, wagerValues) {
  wagerValues.forEach((value) => {
    element.append(createElWithClass('span', '.number', value));
  });
  return element;
}

function showAnswers(clueBox, clueId) {
  changeGameMessage(` ${game.players[0].name}, please choose an answer!
  `)
  $(".wager-container").remove();
  
  let answerContainer;
  let correctAnswer = game.clues[clueId].answer;
  let categoryId = game.clues[clueId].categoryId;
  let answers = game.getAllCluesByCategoryId(categoryId, clueId);
  answers.push(correctAnswer);
  answers = game.dataManager.randomizeArray(answers);
  answers = answers.map(answer => answer);
  
  answerContainer = createElWithClass('div', '.answer-container');
  answers.forEach(answer => {
    let answerBox = createElWithId('div', `#${clueId}`, answer)
    answerBox.classList.add('answer');
    answerContainer.append(answerBox);
  });

  clueBox.append(answerContainer);
  clueBox.append(createElWithClass('button', '.cont-btn', 'Continue'));
  $('.cont-btn').hide();
  
  [...document.querySelectorAll('.answer')].forEach((elem) => {
    elem.addEventListener('click', (event) => {
      
      if (game.round < 3) {
        $(".question").remove();
        $("#game-board").show();
        render(event)
      } else {
        
        let playerGuess = event.target.innerText
        let isCorrectGuess = game.checkAnswer(clueId, playerGuess);
        game.updateFinalWager(isCorrectGuess);
        if (game.finalContestants < 2) {
          game.rotateCurrentPlayer();
          changeGameMessage(` ${game.players[0].name}, please choose an answer!`);
          game.finalContestants++;
        } else {
          $(".question-container").remove();
          let resultList = game.determineWinner();
          changeGameMessage(``);
          
          let resultsContainer = createElWithId('div', '#results')
          resultList.forEach((player, i) => {
            let playerForResults;
            if (i === 0) {
              let winText = `${player.name} won with $${player.finalWager}!`;
              playerForResults = createElWithClass('span', '.results', winText);
              playerForResults.id = 'winner'
            } else {
              let consolation = `Good try ${player.name} with $${player.finalWager}`;
              playerForResults = createElWithClass('span', '.results', consolation);
            }
            resultsContainer.append(playerForResults);
          })

          $("#view").append(resultsContainer);
        }
      }
    })
  })
}

function updateBoard() {
  $("#view").append(createBoard());
  $("#game-board").on("click", render);
}

function createBoard() {
  let tempGameBoard = createElWithId('main', '#game-board');

  let id = 0;
  let colCount = 4;
  let rowCount = 4;
  if (game.round === 2) {
    id = 16;
  } else if (game.round === 3) {
    colCount = 1;
    rowCount = 1;
    id = 32;
  }

  for (let i = 0; i < colCount; i++) {
    let column = createElWithClass('section', '.category');
    let clueCat = `<h4>${game.clues[id].category}</h4>`;
    let row = createElWithClass('article', '.clue', '', clueCat);

    column.append(row);
    for (let j = 0; j < rowCount; j++) {
      let clueValue = '';
      if (game.clues[id].available) {
        clueValue = `<h4> ${game.clues[id].value}</h4>`;
        row = createElWithClass('article', '.clue', '', clueValue);
        row.dataset.id = `${id}`;
      } else {
        row = createElWithClass('article', '.clue', '', clueValue);
      }
      id++;
      column.append(row);
    }
    tempGameBoard.append(column);
  }
  return tempGameBoard;
}

function createPlayerArea() {
  let playerArea = createElWithId('section', '#player-area');

  $("#view").append(playerArea);
  updatePlayers(playerArea);
}

function updatePlayers(playerArea) {

  game.players.forEach((player, i) => {
    let { name, score } = player;
    let playerCard = `${name} score: ${score}`;
    let profilePhoto = createElWithClass('img', '.in-game-profile-picture', '');
    let user = createElWithClass('article', `.player-${i}`, playerCard);
    let photos = game.dataManager.imgs;
    
    profilePhoto.src = photos[i];
    user.prepend(profilePhoto);

    if (i === 0) {
      user.id = 'current-player';
      $('#info').text(`It's Currently ${name}'s Turn!`);
    }
    playerArea.append(user);
  });
}

function createQuitButton() {
  $("body").append(createElWithId('span', '#quit', 'QUIT'));
  $("#quit").on("click", resetGame);
}

function resetGame() {
  location.reload();
}

function clearScreen() {
  $("#view").html("");
}

function createElWithId(ele, elName, elText, htmlText) {

  let tempElement = document.createElement(ele);
  elName = elName.substr(1);

  tempElement.id = elName;

  return addTextOrHTML(tempElement, elText, htmlText);
}

function createElWithClass(ele, elName, elText, htmlText) {

  let tempElement = document.createElement(ele);
  elName = elName.substr(1);

  tempElement.classList.add(elName);

  return addTextOrHTML(tempElement, elText, htmlText);
}

function addTextOrHTML(tempElement, elText, htmlText) {

  if (elText && elText !== undefined && elText !== '') {
    tempElement.innerText = elText;
  }
  if (htmlText && htmlText !== undefined && htmlText !== '') {
    tempElement.innerHTML = htmlText;
  }
  return tempElement;
}

function transitionToGame() {
  const playerNames = $('.player-name-input').toArray().map(player => {
    return player.value;
  });
  // transition img below
  let imgSrc = 'https://media.giphy.com/media/qsNbIXpcFJ9Li/giphy.gif';
  $("#view").html(`<img  id="loading-screen" src="${imgSrc}">`);

  // timeout is to display the transition screen
  window.setTimeout(() => {
    game = new Game(playerNames);
    clearScreen();
    createPlayerArea();
    updateBoard();
    createQuitButton();
  }, 6500);
}

if (typeof module !== 'undefined') {
  module.exports = domMethods;
} else {
  $("#start-btn").on("click", transitionToGame);
}