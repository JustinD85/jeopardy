const chai = require('chai');
const expect = chai.expect;
global.Clue = require('../js/Clue.js');
const Wager = require('../js/Wager');

describe('Make a wager', function () {
  let wager;

  beforeEach(function () {

    wager = new Wager({
      question: 'What is red',
      answer: 'A color',
      pointValue: 100,
      category: 'Colors',
      categoryId: 0
    });
  });

  it('not undefined', function () {

    expect(wager).to.not.be.undefined;
  })

  it('Should be an Object', function () {

    expect(typeof wager).to.equal('object');
  });

  it('Should be able to have default properties', function () {

    expect(wager.question).to.equal('What is red');
    expect(wager.answer).to.equal('A color');
    expect(wager.available).to.equal(true);
    expect(wager.value).to.equal(100);
    expect(wager.category).to.equal('Colors');
    expect(wager.categoryId).to.equal(0);
  });

  it('Should be an instance of Wager', function () {

    expect(wager instanceof Wager).to.equal(true);
  });

  it('Should be able to update wager value', function () {
    wager.updateValue(100);
    
    expect(wager.value).to.equal(100);
  });
});