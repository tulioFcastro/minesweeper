import { Field } from "@/models/Field";

const getRandomValue = (max: number) => {
  return Math.floor(Math.random() * max);
};

export function generateEmptyBoard(rowsLength: number, columnsLength: number) {
  const board = [];
  for (let i = 0; i < rowsLength; i++) {
    const row = [];
    for (let j = 0; j < columnsLength; j++) {
      row.push(new Field());
    }
    board.push(row);
  }

  return board;
}

export function generateMinesPositions(
  minesLength: number,
  rowsLength: number,
  columnsLength: number
) {
  const minesPositions: number[][] = [];

  while (minesPositions.length < minesLength) {
    const row = getRandomValue(rowsLength),
      col = getRandomValue(columnsLength);

    if (!minesPositions.includes([row, col])) {
      minesPositions.push([row, col]);
    }
  }
  return minesPositions;
}

export function convertMines(minesPositions: number[][], board: Field[][]) {
  for (let i = 0; i < minesPositions.length; i++) {
    const row = minesPositions[i][0],
      col = minesPositions[i][1];

    board[row][col].turnMine();
  }
  return board;
}

const getAroundPositions = (
  board: Field[][],
  rowPosition: number,
  colPosition: number
) => {
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

export function updateBoardNumbers(board: Field[][]) {
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
          board[rowPosition][colPosition].increaseMinesAround();
        }
      }
    }
  }

  return board;
}

export function clearSlot(
  board: Field[][],
  rowPosition: number,
  colPosition: number
) {
  board[rowPosition][colPosition].show();

  const aroundPositions = getAroundPositions(board, rowPosition, colPosition);

  /* eslint-disable-next-line */
	clearAround(board, aroundPositions);
}

const clearAround = (board: Field[][], aroundPositions: number[][]) => {
  for (let i = 0; i < aroundPositions.length; i++) {
    if (
      board[aroundPositions[i][0]][aroundPositions[i][1]].getMinesAround() ===
        0 &&
      !board[aroundPositions[i][0]][aroundPositions[i][1]].isOpen()
    ) {
      clearSlot(board, aroundPositions[i][0], aroundPositions[i][1]);
    }
  }
};

// export default {
// 	clearSlot,
// 	updateBoardNumbers,
// 	convertMines,
// 	generateMinesPositions,
// 	generateEmptyBoard,
// };
