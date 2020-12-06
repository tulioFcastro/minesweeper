export class Field {
  value: number;
  private open: boolean;
  blocked: boolean;

  constructor() {
    this.value = 0;
    this.open = false;
    this.blocked = false;
  }

  show(): void {
    this.open = true;
  }

  unlock(): void {
    this.blocked = true;
  }

  isMine(): boolean {
    return this.value === null || this.value === undefined;
  }

  turnMine(): void {
    this.value = null;
  }

  isOpen(): boolean {
    return this.open;
  }

  getValue(): number {
    return this.value;
  }

  increaseValue(): void {
    if (!this.isMine()) {
      this.value++;
    }
  }
}
