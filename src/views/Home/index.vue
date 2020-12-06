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
    <p v-if="gameOver">Too bad, you lost the game.</p>
    <p v-else-if="wonTheGame">Congratulations, you won the game.</p>
  </div>
</template>

<script lang="ts">
import FieldComponent from "./components/FieldComponent.vue";
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { State, Getter, Action } from "vuex-class";
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

  created() {
    this.init();
  }
}
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
