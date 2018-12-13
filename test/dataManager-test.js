const chai = require('chai');
const expect = chai.expect;
global.data = require( '../js/data.js');
global.Clue = require( '../js/Clue.js');
const DataManager = require('../js/dataManager.js');

describe('Manage Data', function () {
  let dataManager;

  beforeEach(function () {

    dataManager = new DataManager();
  });

  it('not undefined', function () {

    expect(dataManager).to.not.be.undefined;
  })

  it('Should be an Object', function () {

    expect(typeof dataManager).to.equal('object');
  });

  it('Should be able to have data', function () {
    
    expect(typeof dataManager.data[0].answer).to.equal('string');
  });

  it('Should be able to format data', function () {
    dataManager.formatData();
    let changed = dataManager.data[0];
  
    expect(changed.available).to.be.equal(true);
    expect(typeof changed.categoryId).to.be.equal('number');
  });

  it('Should be able to flip key/value pairs', function () {
    let obj = { 9: 'one' }
    let newObjKey = dataManager.flipDataSetValues(obj);
  
    expect(newObjKey.one).to.equal('9');
  });

  it('Should be able to randomize an array', function () {
    let arr = [0, 1, 2, 3, 4];
    
    expect(dataManager.randomizeArray(arr)).to.not.equal(arr);
  });

  it('Should be able to get clues for the board', function () {
    let clues = dataManager.getCluesForBoard([0, 1, 2, 3, 4]);

    expect(clues.length).to.equal(16);
  });

  it('Should be able to generate daily double locations', function () {
    let locations = dataManager.generateDailyDoubleNums();

    expect(locations.length).to.equal(4);
    expect(Array.isArray(locations)).to.equal(true);
  });

  it('Should be able to parse titles', function () {
    let niceStr = dataManager.parseTitle('notNicelyFormatted')

    expect(niceStr).to.equal('Not Nicely Formatted');
  });

});