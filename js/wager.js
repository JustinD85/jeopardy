class Wager extends Clue {
  constructor({ question, answer, pointValue, category, categoryId }) {
    super({ question, answer, pointValue, category, categoryId });
  }

  updateValue(num) {
    this.value = num;
  }

}
if (typeof module !== 'undefined') {
  module.exports = Wager;
}