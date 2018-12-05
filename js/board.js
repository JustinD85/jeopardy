export class Board{
  constructor(){
    this.dailyDoubleLocations = 0;
  }
  populate(inBoardFromDOM) {
    console.log('Got from DOM', inBoardFromDOM);
    console.log('Initial', inBoardFromDOM[0].children[0].children[0]);
    function build() {
      
      
      for (let column = 1; column <= 5;column++){
      for (let row = 1; row <= 5; row++) {
        if (row % 5 === 1) {
          //set the category
          inBoardFromDOM[0].children[column - 1].children[row - 1].innerText = `Categories${column}`;
        }
        if (row % 5 !== 1) {
          //set clue
          inBoardFromDOM[0].children[column - 1].children[row - 1].innerText = `Clue${row}`;
        }
      }
    }

    }
    build();
  }
  
}

function a() {
  var row = 0;
  var column = 0;

  while (row < 4) {
    row % 5;
  }
  column++;
}