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
  
  getCluesForBoard(randomCategoriesKeys) {
    let arrayOfClueByPointValues = [];
    randomCategoriesKeys.pop(); // so we get 9 cats
    
    randomCategoriesKeys.forEach((categoryKey) => {

      let allCluesThisCat = this.data.clues.filter((clue) => {
        return clue.categoryId === this.data.categories[categoryKey];
      })

      allCluesThisCat = this.randomizeArray(allCluesThisCat);
      arrayOfClueByPointValues.push(allCluesThisCat.find((clue) => clue.pointValue === 100));
      arrayOfClueByPointValues.push(allCluesThisCat.find((clue) => clue.pointValue === 200));
      arrayOfClueByPointValues.push(allCluesThisCat.find((clue) => clue.pointValue === 300));
      arrayOfClueByPointValues.push(allCluesThisCat.find((clue) => clue.pointValue === 400));
    })

    arrayOfClueByPointValues.splice(36);
    return arrayOfClueByPointValues;
  }

  generateDailyDoubleNums() {
    const dailyDoubles = [];
    dailyDoubles.push(this.randomNumber(0, 16));
    dailyDoubles.push(this.randomNumber(16, 24));
    dailyDoubles.push(this.randomNumber(24, 33));
    dailyDoubles.push(this.randomNumber(32, 36));

    return dailyDoubles;
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  formatData() {
    const notRandomCategories = Object.keys(this.data.categories);
    const randomCategoriesKeys = this.randomizeArray(notRandomCategories);
    const flippedTuringCategories = this.flipDataSetValues(this.data.categories);
    const dailyDoubles = this.generateDailyDoubleNums();

    return this.getCluesForBoard(randomCategoriesKeys).reduce((acc, clue, clueIdForDOM) => {
      let currentCategory = flippedTuringCategories[clue.categoryId];
      let clueOptions = {
        question: clue.question,
        answer: clue.answer,
        pointValue: clue.pointValue,
        categoryId: clue.categoryId,
        category: this.parseTitle(currentCategory)
      };
      
      if (clueIdForDOM > 31 && !dailyDoubles.includes(clueIdForDOM)) return acc; 
      if (dailyDoubles.includes(clueIdForDOM)) { acc.push(new Wager(clueOptions)) }
      else { acc.push(new Clue(clueOptions)) }
      
      return acc;
    }, []);
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