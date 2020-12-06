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
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";

@Component({
  computed: { ...mapState(["died"]) },
  methods: {
    ...mapActions(["click"])
  }
})
export default class SlotButton extends Vue {
  @Prop() private rowPosition!: number;
  @Prop() private columnPosition!: number;
  @Prop() private field!: Field;

  died!: boolean;

  get displayedValue(): string {
    return `${this.field.getMinesAround() || ""}`;
  }

  get hasCursor(): boolean {
    return !this.died && !this.field.isOpen();
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
    if (!this.died) {
      this.click({
        rowPosition: this.rowPosition,
        colPosition: this.columnPosition
      });
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
