const chai = require('chai');
const expect = chai.expect;
const Player = require('../js/player.js');

describe('Make a player', function () {
  let player;

  beforeEach(function () {
    
    player = new Player('Pam');
  });

  it('not undefined', function () {

    expect(player).to.not.be.undefined;
  })

  it('Should be an Object', function () {

    expect(typeof player).to.equal('object');
  });

  it('Should be able to have default properties', function() {

    expect(player.name).to.equal('Pam');
    expect(player.score).to.equal(0);
    expect(player.finalWager).to.equal(0);
  });
});