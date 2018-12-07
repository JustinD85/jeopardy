import { data as turingData } from './data.js';

export class DataManager{
  constructor() {
    this.data = turingData;
    this.currentObj = {};
   return  this.formatData();
  }

  formatData(inLimit = 4) {
    let counter = 0;
    let limit = inLimit;
    let storedData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
  
    return this.data.clues.reduce((acc, clue, i) => {
      let currentID = this.data.clues[i].categoryId;

        if (counter < 20 && storedData[currentID] < limit) {
          let key = Object.values(this.data.categories).indexOf(currentID);
          let currentCategory = Object.keys(this.data.categories)[key];
          let { question, answer, pointValue } = clue;
          
          storedData[currentID] = ++storedData[currentID];

          acc[counter] = {};
          acc[counter].question = question;
          acc[counter].answer = answer;
          acc[counter].value = pointValue;
          acc[counter].category = this.parseTitle(currentCategory);//categories are camelcase
         
          counter++
        }
      
       return acc;
       }, { })
      }

    parseTitle(str) {

      var strToArray = str.split('');
      var foundCapitals = [];
      
      strToArray.forEach((char) => {
          if (char === char.toUpperCase()) {
              foundCapitals.push(strToArray.indexOf(char));
          }
      });

      foundCapitals.forEach((capital, i) => {
          let notMeantToBeCaps = (foundCapitals.indexOf(capital-1) === -1);
          if (notMeantToBeCaps) strToArray.splice(capital + i, 0, ' ');
          i++;
      });

      strToArray[0] = strToArray[0].toUpperCase();
      
      return strToArray.join('');
  }
}