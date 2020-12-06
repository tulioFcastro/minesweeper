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
    died: false
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
    setDied(state, died) {
      Vue.set(state, "died", died);
    },

    showAllFields(state) {
      for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
          state.board[i][j].show();
        }
      }
    }
  },
  actions: {
    init({rootState, commit }) {
      let board = generateEmptyBoard(rootState.rowsLength, rootState.columnsLength);

      const minesPositions = generateMinesPositions(
        rootState.minesLength,
        rootState.rowsLength,
        rootState.columnsLength
      );

      board = convertMines(minesPositions, board);
      board = updateBoardNumbers(board);
      commit("setBoard", board);
      commit("setDied", false);
    },
    click({ rootState, commit }, { rowPosition, colPosition }) {
      rootState.board[rowPosition][colPosition].show();

      if (rootState.board[rowPosition][colPosition].isMine()) {
        commit("setDied", true);
        commit("showAllFields");
        return;
      }
      if (rootState.board[rowPosition][colPosition].getMinesAround() === 0) {
        clearSlot(rootState.board, rowPosition, colPosition);
      }
    }
  },
  getters: {
    wonTheGame: state => {
      let fields: Field[] = [];
      state.board.filter(row => {
        fields = [...fields, ...row];
      });
      const withoutMine = fields.filter(field => !field.isMine());

      return (
        withoutMine.filter(field => field.isOpen()).length ===
        withoutMine.length
      );
    }
  }
});
