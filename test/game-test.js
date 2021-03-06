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

  it('not undefined', function () {

    expect(game).to.not.be.undefined;
  })

  it('Should be able to have default properties', function () {

    expect(game.round).to.equal(1);
    expect(game.players.length).to.deep.equal(3);
    expect(game.board).to.deep.equal({});
    expect(game.dataManager).to.not.be.equal({});
    expect(game.finalContestants).to.equal(0);
  });

  it('Should be able to have 3 players', function () {

    expect(game.players[0]).to.deep.equal(new Player('Adam'));
    expect(game.players[1]).to.deep.equal(new Player('Bob'));
    expect(game.players[2]).to.deep.equal(new Player('Cat'));
  });

  it('Should be able to have data', function () {
    
    let clueAns =  game.clues[0].answer

    expect(typeof clueAns).to.equal('string');
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


    game.clues[clueId].available = false;
    
    for (let i = 0; i < 16; i++) {
      game.clues[i].available = false;
    }
    game.updateRound();
 
    game.getCurrentPlayer().finalWager = 99;
    game.rotateCurrentPlayer();
    game.getCurrentPlayer().finalWager = 101;
    game.rotateCurrentPlayer();
    game.getCurrentPlayer().finalWager = 98;
    let winner = game.determineWinner();
    
    expect(game.checkAnswer(clueId, playerGuess)).to.equal(false);
    expect(game.clues[clueId].available).to.equal(false);
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

    check = game.checkAnswer(0, game.clues[0].answer);
    expect(check).to.be.equal(true);
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
  });

  it('Should be able to update round', function () {

    expect(game.round).to.equal(1);

    for (let i = 0; i < 16; i++) {
      game.clues[i].available = false;
    }
    game.updateRound();
    expect(game.round).to.equal(2);
  });
});