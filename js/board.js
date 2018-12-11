class Board {
  constructor() {
    
  }
  createBoard() {
    let tempGameBoard = createEl('main');
    tempGameBoard.id = 'game-board';
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
      let column = createEl('section');
      column.classList.add('category');

      let row = createEl('article');
      row.classList.add('clue');
      row.innerHTML = `<h1>${game.data[id].category}</h1>`;

      column.append(row);
      for (let j = 0; j < rowCount; j++) {
          row = createEl('article');
          row.classList.add('clue');
          row.dataset.id = `${id}`;
          row.innerHTML = `<h1> ${game.data[id].value}</h1>`;
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
