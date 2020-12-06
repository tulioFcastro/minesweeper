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
      <slot-button
        v-for="(col, j) in row"
        :key="`col-${j}`"
        :field="col"
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
    ...mapState(["board", "gameOver"]),
    ...mapGetters(["wonTheGame"])
  },
  methods: {
    ...mapActions(["init"])
  }
})
export default class Home extends Vue {
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
