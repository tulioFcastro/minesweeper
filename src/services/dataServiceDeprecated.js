import { Field } from "@/models/Field";

const getRandomValue = max => {
  return Math.floor(Math.random() * max);
};

const generateEmptyBoard = (rowsLength, columnsLength) => {
  const board = [];
  for (let i = 0; i < rowsLength; i++) {
    const row = [];
    for (let j = 0; j < columnsLength; j++) {
      row.push(new Field());
    }
    board.push(row);
  }

  return board;
};

const generateMinesPositions = (minesLength, rowsLength, columnsLength) => {
  const minesPositions = [];

  while (minesPositions.length < minesLength) {
    const row = getRandomValue(rowsLength),
      col = getRandomValue(columnsLength);

    if (!minesPositions.includes([row, col])) {
      minesPositions.push([row, col]);
    }
  }
  return minesPositions;
};

const convertMines = (minesPositions, board) => {
  for (let i = 0; i < minesPositions.length; i++) {
    const row = minesPositions[i][0],
      col = minesPositions[i][1];

    board[row][col].turnMine();
  }
  return board;
};
const getAroundPositions = (board, rowPosition, colPosition) => {
  const aroundPositions = [];
  // col
  if (colPosition - 1 >= 0) {
    aroundPositions.push([rowPosition, colPosition - 1]);
  }
  if (colPosition + 1 < board[rowPosition].length) {
    aroundPositions.push([rowPosition, colPosition + 1]);
  }

  // row - before
  if (rowPosition - 1 >= 0) {
    aroundPositions.push([rowPosition - 1, colPosition]);
    if (colPosition - 1 >= 0) {
      aroundPositions.push([rowPosition - 1, colPosition - 1]);
    }
    if (colPosition + 1 < board[rowPosition].length) {
      aroundPositions.push([rowPosition - 1, colPosition + 1]);
    }
  }

  // row - after
  if (rowPosition + 1 < board.length) {
    aroundPositions.push([rowPosition + 1, colPosition]);
    if (colPosition - 1 >= 0) {
      aroundPositions.push([rowPosition + 1, colPosition - 1]);
    }
    if (colPosition + 1 < board[rowPosition].length) {
      aroundPositions.push([rowPosition + 1, colPosition + 1]);
    }
  }

  return aroundPositions;
};
const updateBoardNumbers = board => {
  for (let rowPosition = 0; rowPosition < board.length; rowPosition++) {
    for (
      let colPosition = 0;
      colPosition < board[rowPosition].length;
      colPosition++
    ) {
      const aroundPositions = getAroundPositions(
        board,
        rowPosition,
        colPosition
      );

      for (let i = 0; i < aroundPositions.length; i++) {
        if (board[aroundPositions[i][0]][aroundPositions[i][1]].isMine()) {
          board[rowPosition][colPosition].increaseValue();
        }
      }
    }
  }

  return board;
};

const clearSlot = (board, rowPosition, colPosition) => {
  board[rowPosition][colPosition].show();
  board[rowPosition][colPosition].unlock();

  const aroundPositions = getAroundPositions(board, rowPosition, colPosition);

  /* eslint-disable-next-line */
	clearAround(board, aroundPositions);
};

const clearAround = (board, aroundPositions) => {
  for (let i = 0; i < aroundPositions.length; i++) {
    if (
      board[aroundPositions[i][0]][aroundPositions[i][1]].getValue() === 0 &&
      !board[aroundPositions[i][0]][aroundPositions[i][1]].isOpen()
    ) {
      clearSlot(board, aroundPositions[i][0], aroundPositions[i][1]);
    }
  }
};

export default {
  clearSlot,
  updateBoardNumbers,
  convertMines,
  generateMinesPositions,
  generateEmptyBoard
};
