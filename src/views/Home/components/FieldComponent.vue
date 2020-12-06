<template>
  <div class="cell" @click="clicked" :class="{ cursor: hasCursor }">
    <template v-if="field.isOpen()">
      <div v-if="field.isMine()">
        <p style="font-size:20px">&#x1F4A3;</p>
      </div>
      <div v-else :style="numberStyle">
        <b>{{ displayedValue }}</b>
      </div>
    </template>
    <div v-else class="clear"></div>
  </div>
</template>

<script lang="ts">
import { Field } from "@/models/Field";
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component({})
export default class FieldComponent extends Vue {
  @Prop() private field!: Field;

  // eslint-disable-next-line
  @Action click!: any;
  @State gameOver!: boolean;

  get displayedValue(): string {
    return `${this.field.getMinesAround() || ""}`;
  }

  get hasCursor(): boolean {
    return !this.gameOver && !this.field.isOpen();
  }

  get numberStyle() {
    switch (this.displayedValue) {
      case "1":
        return { color: "blue" };
      case "2":
        return { color: "green" };
      case "3":
        return { color: "red" };
      default:
        return {};
    }
  }

  clicked(): void {
    if (!this.gameOver) {
      this.click(this.field);
    }
  }
}
</script>
<style lang="scss" scoped>
.cell {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background: #f4f4f4;
  padding: 5px;
  border: 1px solid;
  border-radius: 2%;
}
.cursor {
  cursor: pointer;
}
.clear {
  background: #c9d0da;
  width: 100%;
  height: 100%;
}
</style>
