const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies')
chai.use(spies);
global.domMethods = require('../js/Index.js');

describe('Using Dom Methods', function () {

  beforeEach(function () {
  
    chai.spy.on(global.domMethods, [
      'buildClueBox',
      'updatePlayers',
      'changeGameMessage',
      'clearScreen',
      'createBoard',
      'createPlayerArea',
      'createQuitButton',
      'createWagerArea',
      'buildWagerValueBox',
      'render',
      'resetGame',
      'showAnswerOrWager',
      'showAnswers',
      'showFinalRound',
      'showWager',
      'transitionToGame',
      'updateBoard'], ()=> true)
  });

  it('should be able to invoke DOM methods', function () {
    domMethods.transitionToGame();
    domMethods.buildClueBox();
    domMethods.updatePlayers();
    domMethods.changeGameMessage();
    domMethods.clearScreen();
    domMethods.createBoard();
    domMethods.createPlayerArea();
    domMethods.createQuitButton();
    domMethods.createWagerArea();
    domMethods.buildWagerValueBox();
    domMethods.render();
    domMethods.resetGame();
    domMethods.showAnswerOrWager();
    domMethods.showAnswers();
    domMethods.showFinalRound();
    domMethods.showWager();
    domMethods.updateBoard();
    
    expect(domMethods.transitionToGame).to.have.been.called(1);
    expect(domMethods.buildClueBox).to.have.been.called(1);
    expect(domMethods.updatePlayers).to.have.been.called(1);
    expect(domMethods.changeGameMessage).to.have.been.called(1);
    expect(domMethods.clearScreen).to.have.been.called(1);
    expect(domMethods.createBoard).to.have.been.called(1);
    expect(domMethods.createPlayerArea).to.have.been.called(1);
    expect(domMethods.createQuitButton).to.have.been.called(1);
    expect(domMethods.createWagerArea).to.have.been.called(1);
    expect(domMethods.buildWagerValueBox).to.have.been.called(1);
    expect(domMethods.render).to.have.been.called(1);
    expect(domMethods.resetGame).to.have.been.called(1);
    expect(domMethods.showAnswerOrWager).to.have.been.called(1);
    expect(domMethods.showAnswers).to.have.been.called(1);
    expect(domMethods.showFinalRound).to.have.been.called(1);
    expect(domMethods.showWager).to.have.been.called(1);
    expect(domMethods.updateBoard).to.have.been.called(1);
  });
});