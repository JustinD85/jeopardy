const chai = require('chai');
const expect = chai.expect;
const Clue = require('../js/Clue.js');

describe('Make a clue', function () {
  let clue;

  beforeEach(function () {

    clue = new Clue('What is red', 'A color', 100, 'Colors');
  });

  it('Should be able to have a question', function () {

    expect(clue.question).to.equal('What is red');
  });

  it('Should be able to have an answer', function () {

    expect(clue.answer).to.equal('A color');
  });

  it('Should be able to have a default availability', function () {

    expect(clue.available).to.equal(true);
  });

  it('Should be able to have a value', function () {

    expect(clue.value).to.equal(100);
  });

  it('Should be able to have a category', function () {

    expect(clue.category).to.equal('Colors');
  });
});