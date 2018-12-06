import { Game } from './game.js';
import { Player } from './player.js';
import {get, getAll} from './util/utilities.js'


//Notionally from DOM
let playerOneName = 'Travis';
let playerTwoName = 'TRobot';
let playerThreeName = 'TJustins';
const boardFromDOM = document.querySelectorAll('.game-board');
let game;

//create users array
get('#start-btn').addEventListener('click', function () {
  // playerOneName = get('#p1-name-input').value;
  // playerTwoName = get('#p2-name-input').value;
  // playerThreeName = get('#p3-name-input').value;

  //set screen transition
    //add transition img
  get('#view').innerHTML = '<img src="./img/loading.gif">';

  window.setTimeout(() => {
    game = new Game([playerOneName, playerTwoName, playerThreeName]);
  }, 500)

 

  // get('.player1-name-label').innerText = playerOneName;
  // get('.player2-name-label').innerText = playerTwoName;
  // get('.player3-name-label').innerText = playerThreeName;

  // get('#p1-name-input').value = '';
  // get('#p2-name-input').value = '';
  // get('#p3-name-input').value = '';
  
});

//EVENT BASED GAME!!, events activate when we click something!

//  DELETE LATER ... USING FOR CONVIENENCE
get('#start-btn').click();

// game.setUpBoard(boardFromDOM);
