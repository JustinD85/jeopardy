class DataManager {
  constructor() {
    this.data = data;
    return this.formatData();
  }

  formatData(inLimit = 4) {
    let clueId = 0;
    let categoryLimit = inLimit;
    let categoryLength = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
      6: 0, 7: 0, 8: 0, 9: 0, 10: 0
    };

    return this.data.clues.reduce((acc, clue) => {
      let currentID = clue.categoryId;
      let dailyDoubles = [0, 16, 17, 32];
        //0 - 15 // 16 - 31 x 2 // 32++

      if (categoryLength[currentID] < categoryLimit) {
        let key = Object.values(this.data.categories).indexOf(currentID);
        let currentCategory = Object.keys(this.data.categories)[key];
        let { question, answer, pointValue } = clue;
        let category = this.parseTitle(currentCategory);

        categoryLength[currentID] = ++categoryLength[currentID];
 
        if (dailyDoubles.includes(clueId)) {
          acc[clueId] = new Wager(question, answer, pointValue, category);
        } else {
          acc[clueId] = new Clue(question, answer, pointValue, category);
        }
        clueId++
      }
      return acc;
    }, {})
  }

  parseTitle(str) {

    var strToArray = str.split('');
    var capitalIndexes = [];

    strToArray.forEach((char) => {
      if (char === char.toUpperCase()) {
        capitalIndexes.push(strToArray.indexOf(char));
      }
    });

    capitalIndexes.forEach((capital, i) => {
      let notCapitalWord = (capitalIndexes.indexOf(capital - 1) === -1);
      if (notCapitalWord) {
        strToArray.splice(capital + i, 0, ' ');
        i++;
      }
    });

    strToArray[0] = strToArray[0].toUpperCase();

    return strToArray.join('');
  }
}
if (typeof module !== 'undefined') {
  module.exports = DataManager;
}