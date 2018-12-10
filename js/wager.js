// const  Clue  = require('./clue.js');
class Wager extends Clue {
  constructor(question, answer, pointValue, category, isDailyDouble) {
    super(question, answer, pointValue, category);
    this.isDailyDouble = isDailyDouble;
  }

  updateValue(num) {
    this.value = num;
  }

}
if (typeof module !== 'undefined') {
  module.exports = Wager;
}