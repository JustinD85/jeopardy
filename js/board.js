class Board {
  constructor() {
    
  }
  createBoard() {
    let tempGameBoard = createElWithId('main', '#game-board');
    
    let id = 0;
    let colCount = 4;
    let rowCount = 4;
    if (game.round === 2) {
      id = 16;
    } else if (game.round === 3) {
      colCount = 1;
      rowCount = 1;
      id = 32;
    }

    for (let i = 0; i < colCount; i++) {
      let column = createElWithClass('section', '.category');
      let clueCat = `<h1>${game.data[id].category}</h1>`;
      let row = createElWithClass('article', '.clue', '', clueCat);

      column.append(row);
      for (let j = 0; j < rowCount; j++) {
        let clueValue = `<h1> ${game.data[id].value}</h1>`;
        row = createElWithClass('article', '.clue', '', clueValue);
        row.dataset.id = `${id}`;
        id++;
        column.append(row);
      }
      tempGameBoard.append(column);
    }
    return tempGameBoard;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Board;
}
