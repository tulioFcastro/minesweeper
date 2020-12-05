/* eslint-disable */

const AROUND_CELL_OPERATORS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];
const generateEmptyBoard = (rowsLength, columnsLength) => {
	const board = [];
	for (let i = 0; i < rowsLength; i++) {
		board.push([]);
		for (let j = 0; j < columnsLength; j++) {
			board[i][j] = { value: 0, hidden: true, blocked: false };
		}
	}

	return board;
};

const generateMinesPositions = (minesLength, rowsLength, columnsLength) => {
	const minesPositions = [];

	while (minesPositions.length < minesLength) {
		const y = getRandomInt(0, rowsLength);
		const x = getRandomInt(0, columnsLength);

		if (!isAlreadyAMine([y, x], minesPositions)) {
			minesPositions.push([y, x]);
		}
	}
	return minesPositions;
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

const isAlreadyAMine = (minePosition, minesPositions) => {
	return minesPositions.join(' ').includes(minePosition.toString());
};

const insertMines = (minesPositions, board) => {
	for (let i = 0; i < minesPositions.length; i++) {
		const y = minesPositions[i][0];
		const x = minesPositions[i][1];
		board[y][x].value = null;
	}
	return board;
};

const updateBoardNumbers = (
	minesPositions,
	rowsLength,
	columnsLength,
	board
) => {
	for (let i = 0; i < minesPositions.length; i++) {
		for (let j = 0; j < AROUND_CELL_OPERATORS.length; j++) {
			const minePosition = minesPositions[i],
				around = AROUND_CELL_OPERATORS[j];

			const rowPosition = minePosition[0] + around[0],
				colPosition = minePosition[1] + around[1];

			if (
				rowPosition >= 0 &&
				rowPosition < rowsLength &&
				colPosition >= 0 &&
				colPosition < columnsLength &&
				board[rowPosition][colPosition].value !== null
			) {
				board[rowPosition][colPosition].value++;
			}
		}
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

const clearAround = (board, aroundPositions) => {
	for (let i = 0; i < aroundPositions.length; i++) {
		if (
			board[aroundPositions[i][0]][aroundPositions[i][1]].value === 0 &&
			board[aroundPositions[i][0]][aroundPositions[i][1]].hidden
		) {
			clearSlot(board, aroundPositions[i][0], aroundPositions[i][1]);
		}
	}
};

const clearSlot = (board, rowPosition, colPosition) => {
	board[rowPosition][colPosition].hidden = false;
	board[rowPosition][colPosition].block = true;

	const aroundPositions = getAroundPositions(board, rowPosition, colPosition);

	clearAround(board, aroundPositions);
};
export default {
	clearSlot,
	updateBoardNumbers,
	insertMines,
	generateMinesPositions,
	generateEmptyBoard,
};
