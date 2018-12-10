import { Clue } from './clue.js';

export class Wager extends Clue {
  constructor(question, answer, pointValue, category, isDailyDouble) {
    super(question, answer, pointValue, category);
    this.isDailyDouble = isDailyDouble;
  }
  
  updateValue(num) {
    this.value = num;
  }

}

// module.exports = Wager;