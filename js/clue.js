class Clue {
  constructor({ question, answer, pointValue, category, categoryId }) {
    this.question = question;
    this.answer = answer;
    this.available = true;
    this.value = pointValue;
    this.category = category;
    this.categoryId = categoryId;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Clue;
}