import { Field } from "@/models/Field";
import {
  clearSlot,
  updateBoardNumbers,
  convertMines,
  generateMinesPositions,
  generateEmptyBoard
} from "@/services/DataService";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rowsLength: 10,
    columnsLength: 10,
    minesLength: 10,
    board: [],
    gameOver: false
  },
  mutations: {
    setRowsLength(state, rowsLength) {
      Vue.set(state, "rowsLength", rowsLength);
    },
    setColumnsLength(state, columnsLength) {
      Vue.set(state, "columnsLength", columnsLength);
    },
    setMinesLength(state, minesLength) {
      Vue.set(state, "minesLength", minesLength);
    },
    setBoard(state, board) {
      Vue.set(state, "board", board);
    },
    setGameOver(state, gameOver) {
      Vue.set(state, "gameOver", gameOver);
    },

    showAllFields(state) {
      state.board.forEach((row: Field[]) => {
        row.forEach(field => field.show());
      });
    }
  },
  actions: {
    init({ rootState, commit }) {
      let board = generateEmptyBoard(
        rootState.rowsLength,
        rootState.columnsLength
      );

      const minesPositions = generateMinesPositions(
        rootState.minesLength,
        rootState.rowsLength,
        rootState.columnsLength
      );

      board = convertMines(minesPositions, board);
      board = updateBoardNumbers(board);
      commit("setBoard", board);
      commit("setGameOver", false);
    },
    click({ rootState, commit }, { rowPosition, colPosition }) {
      const field: Field = rootState.board[rowPosition][colPosition];
      field.show();

      if (field.isMine()) {
        commit("setGameOver", true);
        commit("showAllFields");
        return;
      }
      if (field.getMinesAround() === 0) {
        clearSlot(rootState.board, rowPosition, colPosition);
      }
    }
  },
  getters: {
    wonTheGame: state => {
      const fields: Field[] = [];

      state.board.forEach((row: Field[]) => {
        row.forEach(col => fields.push(col));
      });

      const withoutMine = fields.filter(field => !field.isMine());

      return (
        withoutMine.filter(field => field.isOpen()).length ===
        withoutMine.length
      );
    }
  }
});
