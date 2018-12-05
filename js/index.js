import { Game } from './game.js';
import { Player } from './player.js';
const game = new Game();

//Notionally from DOM
const playerOneName = 'Travis';
const playerTwoName = 'TRobot';
const playerThreeName = 'TJustins';
const boardFromDOM = document.querySelectorAll('.game-board');

//create users array
var playerArray =
  [
    new Player(playerOneName),
    new Player(playerTwoName),
    new Player(playerThreeName)
  ];

game.start(playerArray);
game.setUpBoard(boardFromDOM);
