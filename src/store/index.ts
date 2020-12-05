import Vue from 'vue';
import Vuex from 'vuex';
import DataService from '@/services/dataService';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rowsLength: 10,
		columnsLength: 10,
		minesLength: 10,
		board: [],
		minesPositions: null,
		died: false,
	},
	mutations: {
		setRowsLength(state, rowsLength) {
			Vue.set(state, 'rowsLength', rowsLength);
		},
		setColumnsLength(state, columnsLength) {
			Vue.set(state, 'columnsLength', columnsLength);
		},
		setMinesLength(state, minesLength) {
			Vue.set(state, 'minesLength', minesLength);
		},
		setBoard(state, board) {
			Vue.set(state, 'board', board);
		},
		setMinesPositions(state, minesPositions) {
			Vue.set(state, 'minesPositions', minesPositions);
		},
		setDied(state, died) {
			Vue.set(state, 'died', died);
		},

		slotClicked(state, { rowPosition, colPosition }) {
			Vue.set(state.board[rowPosition][colPosition], 'hidden', false);
			Vue.set(state.board[rowPosition][colPosition], 'blocked', true);
		},
		showAllFields(state) {
			for (let i = 0; i < state.board.length; i++) {
				for (let j = 0; j < state.board[i].length; j++) {
					Vue.set(state.board[i][j], 'hidden', false);
					Vue.set(state.board[i][j], 'blocked', true);
				}
			}
		},
	},
	actions: {
		init({ commit }, { rowsLength, columnsLength, minesLength }) {
			let board = DataService.generateEmptyBoard(rowsLength, columnsLength);
			const minesPositions = DataService.generateMinesPositions(
				minesLength,
				rowsLength,
				columnsLength
			);
			commit('setMinesPositions', minesPositions);
			board = DataService.insertMines(minesPositions, board);
			board = DataService.updateBoardNumbers(
				minesPositions,
				rowsLength,
				columnsLength,
				board
			);
			commit('setBoard', board);
			commit('setDied', false);
		},
		click({ rootState, commit }, { rowPosition, colPosition }) {
			commit('slotClicked', { rowPosition, colPosition });

			if (rootState.board[rowPosition][colPosition].value === null) {
				commit('setDied', true);
				commit('showAllFields');
				return;
			}
			if (rootState.board[rowPosition][colPosition].value === 0) {
				DataService.clearSlot(rootState.board, rowPosition, colPosition);
			}
		},
	},
	getters: {
		wonTheGame: (state) => {
			let cells = [];
			state.board.filter((row) => {
				cells = [...cells, ...row];
			});
			const withoutBomb = cells.filter((cell) => cell.value > 0);

			return (
				withoutBomb.filter((cell) => !cell.hidden).length === withoutBomb.length
			);
			// ((row) => row.map((col) => col));
		},
	},
});
