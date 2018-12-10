const chai = require('chai');
const expect = chai.expect;
const Clue = require('../js/clue.js');
const Wager = require('../js/wager.js');

describe('Make a wager', function () {
  let wager;

  beforeEach(function () {

    wager = new Wager('What is red', 'A color', 100, 'Colors', true);
  });

  it('Should be able to have a question', function () {

    expect(wager.question).to.equal('What is red');
  });

  it('Should be able to have an answer', function () {

    expect(wager.answer).to.equal('A color');
  });

  it('Should be able to have a default availability', function () {

    expect(wager.available).to.equal(true);
  });

  it('Should be able to have a value', function () {

    expect(wager.value).to.equal(100);
  });

  it('Should be able to have a category', function () {

    expect(wager.category).to.equal('Colors');
  });

  it('Should be able to have a Daily Double', function () {

    expect(wager.isDailyDouble).to.equal(true);
  });
});