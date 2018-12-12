const chai = require('chai');
const expect = chai.expect;
global.data = require( '../js/data.js');
global.Clue = require( '../js/Clue.js');
const DataManager = require('../js/dataManager.js');

describe('Manage Data', function () {
  let currentObj;

  beforeEach(function () {

    currentObj = new DataManager();
  });

  it('not undefined', function () {

    expect(currentObj).to.not.be.undefined;
  })

  it('Should be an Object', function () {

    expect(typeof currentObj).to.equal('object');
  });

  it('Should be able to have data', function () {
    
    expect(typeof currentObj[0].answer).to.equal('string');
  });

  // it('Should be able to manage data', function () {

  //   expect(currentObj[0].answer).to.equal(global.data.clues[0].answer);
  //   expect(currentObj[0].available).to.be.true;
  // });
});