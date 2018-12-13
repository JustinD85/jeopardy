const chai = require('chai');
const expect = chai.expect;
global.data = require('../js/data.js');
global.DataManager = require('../js/dataManager');
global.Player = require('../js/player.js');
global.Board = require('../js/board.js');
global.Wager = require('../js/wager');
global.Clue = require('../js/Clue.js');
const Game = require('../js/game.js');

describe('Make a game', function () {
  let game;

  beforeEach(function () {
    
    game = new Game(['Adam', 'Bob', 'Cat']);
  });

  it('Should be able to have rounds', function () {

    expect(game.round).to.equal(1);
  });

  it('Should be able to have 3 players', function () {

    expect(game.players[0]).to.deep.equal(new Player('Adam'));
    expect(game.players[1]).to.deep.equal(new Player('Bob'));
    expect(game.players[2]).to.deep.equal(new Player('Cat'));
  });

  it.skip('Should be able to have a board', function () {

    expect(game.board).to.deep.equal();
  });

  it('Should be able to have data', function () {
    
   let clueAns =  game.dataManager.data[0].answer

    expect(typeof clueAns).to.equal('string');
  });

  it('Should be able to verify clicking a clue', function () {

    expect(game.canClickClue).to.equal(true);
    game.canClickClue = false;
    expect(game.canClickClue).to.equal(false);
  });

  it('Should be able to have tally final contestants', function () {

    expect(game.finalContestants).to.be.equal(0);
    game.finalContestants++;
    game.finalContestants++;
    expect(game.finalContestants).to.be.equal(2);
  });

  it('Should be able to update itself', function () {
    game.canClickClue = false;
    let clueId = 0;
    let playerGuess = 'hi'
    
    game.update(clueId, playerGuess);


    game.dataManager.data[clueId].available = false;
    
    for (let i = 0; i < 16; i++) {
      game.dataManager.data[i].available = false;
    }
    game.updateRound();
 
    game.players[0].finalWager = 99;
    game.players[1].finalWager = 101;
    game.players[2].finalWager = 98;
    let winner = game.determineWinner();
    
    expect(game.checkAnswer(clueId, playerGuess)).to.equal(false);
    expect(game.dataManager.data[clueId].available).to.equal(false);
    expect(game.canClickClue).to.equal(true);
    expect(game.players[0].score).to.be.equal(0);
    expect(game.players[0].name).to.be.equal('Cat');
    expect(game.round).to.equal(2);
    expect(winner[0].name).to.equal('Cat');
  });

  it('Should be able to get all clues by id', function () {

    let clueArr = game.getAllCluesByCategoryId(1, 1);

    expect(clueArr.length).to.equal(3);
    expect(Array.isArray(clueArr)).to.equal(true);
  });

  it('Should be able to check answer', function () {

    let check = game.checkAnswer(0, 'Uncrustables rock');

    expect(check).to.be.equal(false);
  });

  it('Should be able to update final wager', function () {

    game.players[0].score = 900;
    game.players[0].finalWager = 100;
    game.updateFinalWager(true);

    expect(game.players[0].finalWager).to.be.equal(1000);
  });

  it('Should be able to update player score', function () {
    game.updatePlayerScore(true, 0);
    expect(game.players[0].score).to.be.equal(100);

    game.rotateCurrentPlayer();
    game.updatePlayerScore(true, 1);
    expect(game.players[0].score).to.be.equal(200);

    game.rotateCurrentPlayer();
    game.updatePlayerScore(true, 2);
    expect(game.players[0].score).to.be.equal(300);
  });

  it('Should be able to rotate current player', function () {
    expect(game.players[0].name).to.be.equal('Adam');

    game.rotateCurrentPlayer();
    expect(game.players[0].name).to.be.equal('Bob');

    game.rotateCurrentPlayer();
    expect(game.players[0].name).to.be.equal('Cat');
  });

  it('Should be able to determine winner', function () {
    game.players[0].finalWager = 100;
    game.players[1].finalWager = 1;
    game.players[2].finalWager = 1;
    let winner = game.determineWinner();

    expect(winner[0].name).to.equal('Adam');

    game.players[0].finalWager = 100;
    game.players[1].finalWager = 1;
    game.players[2].finalWager = 9999;
    let kitty = game.determineWinner();

    expect(kitty[0].name).to.equal('Cat');
  });

  it('Should be able to update round', function () {

    expect(game.round).to.equal(1);

    for (let i = 0; i < 16; i++) {
      game.dataManager.data[i].available = false;
    }
    game.updateRound();
    expect(game.round).to.equal(2);

    for (let i = 0; i < 32; i++) {
      game.dataManager.data[i].available = false;
    }
    game.updateRound();
    expect(game.round).to.equal(3);

  });



});