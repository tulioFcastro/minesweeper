<template>
  <div class="home">
    <div>
      <p v-if="died" class="emoji cursor" @click="clearBoard">
        &#128531;
      </p>
      <p v-else-if="wonTheGame" @click="clearBoard" class="emoji cursor">
        &#128526;
      </p>
      <p v-else class="emoji">&#128512;</p>
    </div>
    <div class="row" v-for="(row, i) in board" :key="`row-${i}`">
      <slot-button
        v-for="(col, j) in row"
        :key="`col-${j}`"
        :data="col"
        :row-position="i"
        :column-position="j"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SlotButton from "./components/SlotButton";
import { mapActions, mapGetters, mapState } from "vuex";

@Component({
  components: { SlotButton },
  computed: {
    ...mapState(["board", "died"]),
    ...mapGetters(["wonTheGame"])
  },
  methods: {
    ...mapActions(["init"]),
    clearBoard() {
      this.init({
        rowsLength: 10,
        columnsLength: 10,
        minesLength: 9
      });
    }
  },
  created() {
    this.clearBoard();
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.emoji {
  font-size: 30px;
}
.cursor {
  cursor: pointer;
}
.row {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
