class Clue {
  constructor(question, answer, pointValue, category) {
    this.question = question;
    this.answer = answer;
    this.available = true;
    this.value = pointValue;
    this.category = category;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Clue;
}