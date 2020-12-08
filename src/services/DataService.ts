import { Field } from "@/models/Field";

const getRandomValue = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export function generateEmptyBoard(
  rowsLength: number,
  columnsLength: number
): Field[][] {
  const board: Field[][] = [];
  for (let i = 0; i < rowsLength; i++) {
    const row = [];
    for (let j = 0; j < columnsLength; j++) {
      row.push(new Field(i, j));
    }
    board.push(row);
  }

  return board;
}

export function generateMinesPositions(
  minesLength: number,
  rowsLength: number,
  columnsLength: number
): number[][] {
  const minesPositions: number[][] = [];

  while (minesPositions.length < minesLength) {
    const row = getRandomValue(rowsLength),
      col = getRandomValue(columnsLength);

    if (
      !minesPositions.find(minePos => minePos[0] === row && minePos[1] === col)
    ) {
      minesPositions.push([row, col]);
    }
  }
  return minesPositions;
}

export function convertMines(
  minesPositions: number[][],
  board: Field[][]
): Field[][] {
  for (let i = 0; i < minesPositions.length; i++) {
    const row = minesPositions[i][0],
      col = minesPositions[i][1];

    board[row][col].turnMine();
  }
  return board;
}

const getAroundPositions = (board: Field[][], field: Field): Field[] => {
  const aroundPositions: Field[] = [];
  // col
  if (field.colPosition - 1 >= 0) {
    aroundPositions.push(board[field.rowPosition][field.colPosition - 1]);
  }
  if (field.colPosition + 1 < board[field.rowPosition].length) {
    aroundPositions.push(board[field.rowPosition][field.colPosition + 1]);
  }

  // row - before
  if (field.rowPosition - 1 >= 0) {
    aroundPositions.push(board[field.rowPosition - 1][field.colPosition]);
    if (field.colPosition - 1 >= 0) {
      aroundPositions.push(board[field.rowPosition - 1][field.colPosition - 1]);
    }
    if (field.colPosition + 1 < board[field.rowPosition].length) {
      aroundPositions.push(board[field.rowPosition - 1][field.colPosition + 1]);
    }
  }

  // row - after
  if (field.rowPosition + 1 < board.length) {
    aroundPositions.push(board[field.rowPosition + 1][field.colPosition]);
    if (field.colPosition - 1 >= 0) {
      aroundPositions.push(board[field.rowPosition + 1][field.colPosition - 1]);
    }
    if (field.colPosition + 1 < board[field.rowPosition].length) {
      aroundPositions.push(board[field.rowPosition + 1][field.colPosition + 1]);
    }
  }

  return aroundPositions;
};

export function updateMinesAround(board: Field[][]): Field[][] {
  board.forEach((row: Field[]) => {
    row.forEach(field => {
      const aroundPositions = getAroundPositions(board, field);
      for (let i = 0; i < aroundPositions.length; i++) {
        if (aroundPositions[i].isMine()) {
          field.increaseMinesAround();
        }
      }
    });
  });

  return board;
}

export function clearSlot(board: Field[][], field: Field): void {
  field.show();

  const aroundPositions = getAroundPositions(board, field);

  aroundPositions.forEach(field => {
    if (field.getMinesAround() === 0 && !field.isOpen()) {
      clearSlot(board, field);
    }
  });
}
