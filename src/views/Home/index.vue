<template>
  <div class="home">
    <div>
      <p v-if="gameOver" class="emoji cursor" @click="init">
        &#128531;
      </p>
      <p v-else-if="wonTheGame" @click="init" class="emoji cursor">
        &#128526;
      </p>
      <p v-else class="emoji">&#128512;</p>
    </div>
    <div class="row" v-for="(row, i) in board" :key="`row-${i}`">
      <field-component v-for="(col, j) in row" :key="`col-${j}`" :field="col" />
    </div>
    <p v-if="gameOver" class="message">Too bad, you lost the game.</p>
    <p v-else-if="wonTheGame" class="message">
      Congratulations, you won the game.
    </p>
    <div class="change-data">
      <label for="rows">Rows</label>
      <input id="rows" v-model="rows" />
      <label for="cols">Cols</label>
      <input id="cols" v-model="cols" />
      <label for="mines">Mines</label>
      <input id="mines" v-model="mines" />
      <button @click="test">test</button>
    </div>
  </div>
</template>

<script lang="ts">
import FieldComponent from "./components/FieldComponent.vue";
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation } from "vuex-class";
import { Field } from "@/models/Field";

@Component({
  components: { FieldComponent }
})
export default class Home extends Vue {
  @State board!: Field[][];
  @State gameOver!: boolean;

  // eslint-disable-next-line
  @Action init!: any;

  @Getter wonTheGame!: boolean;
  // eslint-disable-next-line
  @Mutation setRowsLength!: any;
  // eslint-disable-next-line
  @Mutation setColumnsLength!: any;
  // eslint-disable-next-line
  @Mutation setMinesLength!: any;

  rows = 10;
  cols = 10;
  mines = 5;

  created() {
    this.init();
  }

  test() {
    this.setRowsLength(this.rows);
    this.setColumnsLength(this.cols);
    this.setMinesLength(this.mines);

    this.init();
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
}
.emoji {
  font-size: 30px;
  display: flex;
  justify-content: center;
}
.cursor {
  cursor: pointer;
}
.row {
  display: flex;
  width: 100%;
  justify-content: center;
}

.message {
  margin: 16px auto;
}

.change-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
}
</style>
