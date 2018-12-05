import { Game } from './game.js';
import { Player } from './player.js';
const game = new Game();


//Notionally from DOM
let playerOneName = 'Travis';
let playerTwoName = 'TRobot';
let playerThreeName = 'TJustins';
const boardFromDOM = document.querySelectorAll('.game-board');

//create users array
get('#start-btn').addEventListener('click', function () {
  playerOneName = get('#p1-name-input').value;
  playerTwoName = get('#p2-name-input').value;
  playerThreeName = get('#p3-name-input').value;

  //set screen transition
    //add transition img
  get('#view').innerHTML = '<img src="./img/loading.gif">';

  window.setTimeout(() => {
    get('#view').innerHTML = '<h1>Javascript Game</h1>'
  }, 1500)
  
  //game loads
    //load new view
    

  // get('.player1-name-label').innerText = playerOneName;
  // get('.player2-name-label').innerText = playerTwoName;
  // get('.player3-name-label').innerText = playerThreeName;

  // get('#p1-name-input').value = '';
  // get('#p2-name-input').value = '';
  // get('#p3-name-input').value = '';
  
});
// var playerArray =
//   [
//     new Player(playerOneName),
//     new Player(playerTwoName),
//     new Player(playerThreeName)
//   ];

// game.start(playerArray);
// game.setUpBoard(boardFromDOM);

function get(Element) {
  return document.querySelector(Element);
}

function getAll(Element) {
  return document.querySelectorAll(Element);
}