const chai = require('chai');
const expect = chai.expect;
const Player = require('../js/player.js');

describe('Make a player', function () {
  let player;

  beforeEach(function () {
    
    player = new Player('Pam');
  });

  it('Should be able to make a new player', function() {

    expect(player.name).to.equal('Pam');
  });

  it('Should start with a score of zero', function () {

    expect(player.score).to.equal(0);
  });
});