// const chai = require('chai');
// const expect = chai.expect;
// const Wager = require('../js/Wager.js');

// describe('Make a wager', function () {

//   // beforeEach(function () {
//   //   wager = new Wager();
//   // });

//   it('Should be able to have a question', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.question).to.equal('What is red');

//   });

//   it('Should be able to have an answer', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.answer).to.equal('A color');

//   });

//   it('Should be able to have a default availability', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.available).to.equal(true);

//   });

//   it('Should be able to have a value', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.value).to.equal(100);

//   });

//   it('Should be able to have a category', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.category).to.equal('Colors');

//   });

//   it('Should be able to have a Daily Double', function () {
//     let wager = new Wager('What is red', 'A color', 100, 'Colors', true);

//     expect(wager.isDailyDouble).to.equal(true);

//   });

// });