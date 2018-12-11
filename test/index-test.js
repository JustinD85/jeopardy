const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies')
chai.use(spies);
global.domMethods = require('../js/Index.js');

describe('Start game', function () {

  beforeEach(function () {

   chai.spy.on(global.domMethods,['transitionToGame'], ()=> true)
  });

  it('should be able to transition from start screen to game', function () {

    domMethods.transitionToGame();
    expect(domMethods.transitionToGame).to.have.been.called(1);
  });
});