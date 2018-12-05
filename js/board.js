export class Board{
  constructor(){
    this.dailyDoubleLocations = 0;
  }
  populate(inBoardFromDOM) {
    console.log('Got from DOM', inBoardFromDOM);
    console.log('Initial', inBoardFromDOM[0].children[0].children[0]);
    function build() {
      let row = 1;
      let column = 1;

      while (row <= 5) {
        if (row % 5 === 1) {
          //set the category
          inBoardFromDOM[0].children[column - 1].children[row - 1].innerText = 'Category';
        }
        if (row % 5 !== 1) {
          //set clue
          inBoardFromDOM[0].children[column - 1].children[row - 1].innerText = 'Clue';
        }
        row++;
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