const chai = require('chai');
const expect = chai.expect;
const Clue = require('../js/Clue.js');

describe('Make a clue', function () {
  let clue;

  beforeEach(function () {

    clue = new Clue({
      question: 'What is red',
      answer: 'A color',
      pointValue: 100,
      category: 'Colors',
      categoryId: 7
    });
  });

  it('not undefined', function () {

    expect(clue).to.not.be.undefined;
  })

  it('Should be an Object', function () {

    expect(typeof clue).to.equal('object');
  });

  it('Should be able to have default properties', function () {
    
    expect(clue.question).to.equal('What is red');
    expect(clue.answer).to.equal('A color');
    expect(clue.available).to.equal(true);
    expect(clue.value).to.equal(100);
    expect(clue.category).to.equal('Colors');
    expect(clue.categoryId).to.equal(7);
  });
});