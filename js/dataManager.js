class DataManager {
  constructor() {
    this.data = data;
    return this.formatData();
  }

  flipDataSetValues(object) {
    const tempObj = {};
    for (let key in object) {
      tempObj[object[key]] = key;
    }
    return tempObj;
  }

  randomizeArray(inArray) {
    let tempArray = [];
    let randomIndex;

    while (inArray.length) {
      randomIndex = Math.floor(Math.random() * inArray.length);
      tempArray.push(...inArray.splice(randomIndex))
    }
    return tempArray;
  }

  createMatrixFromData(maxPointValue, randomCategoriesKeys) {
    let count = 100;
    let tempCats;
    let arrayOfClueByPointValues = [];
    randomCategoriesKeys.pop(); // so we get 9 cats
    while (count <= maxPointValue) {

      tempCats = randomCategoriesKeys.map((categoryKey) => {
        let log = this.data.clues.filter((clue) => {
          return clue.categoryId === this.data.categories[categoryKey] &&
            clue.pointValue === count;
        })
        return log[0];
      })
      count += 100;
      arrayOfClueByPointValues.push(tempCats);
    }
    return arrayOfClueByPointValues;
  }
  generateDailyDoubleNums() {
    const dailyDoubles = [];
    dailyDoubles.push(this.randomNumber(0, 16));
    dailyDoubles.push(this.randomNumber(16, 24));
    dailyDoubles.push(this.randomNumber(24, 33));
    dailyDoubles.push(this.randomNumber(32, 33));
    return dailyDoubles;
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  formatData() {
    const notRandomCategories = Object.keys(this.data.categories);
    const randomCategoriesKeys = this.randomizeArray(notRandomCategories);

    return this.createMatrixFromData(400, randomCategoriesKeys).reduce((acc, pointValueArray, i) => {
      let clueId = (100 * i) / 100;

      pointValueArray.forEach((clue, i) => {
        let currentCategory = randomCategoriesKeys[i];
        let { question, answer, pointValue } = clue;
        let category = this.parseTitle(currentCategory);
        let dailyDoubles = this.generateDailyDoubleNums();

        if (dailyDoubles.includes(clueId)) {
          acc[clueId] = new Wager(question, answer, pointValue, category);
        } else {
          acc[clueId] = new Clue(question, answer, pointValue, category);
        }
        clueId += 4;
      })

      return acc;
    }, {});
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