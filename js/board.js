class Board {
  constructor() {
    
  }
  createBoard() {
    let tempGameBoard = createEl('main');
    tempGameBoard.id = 'game-board';
    for (let i = 0, id = 0; i < 5; i++) {
      let column = createEl('section');
      column.classList.add('category');
      for (let j = 0; j < 5; j++) {
        let row = createEl('article');
        if (j === 0) {
          row.classList.add('clue');
          row.innerHTML = `<h1>${game.data[id].category}</h1>`;
        }
        else {
          row.classList.add('clue');
          row.dataset.id = `${id}`;
          row.innerHTML = `<h1> ${game.data[id].value}</h1>`;
          id++;
        }
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
