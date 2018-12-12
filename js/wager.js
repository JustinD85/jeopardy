class Wager extends Clue {
  constructor({ question, answer, pointValue, category }) {
    super({ question, answer, pointValue, category });
  }

  updateValue(num) {
    this.value = num;
  }

}
if (typeof module !== 'undefined') {
  module.exports = Wager;
}