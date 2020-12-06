export class Field {
  private minesAround: number;
  private open: boolean;
  mine: boolean;

  constructor() {
    this.minesAround = 0;
    this.open = false;
    this.mine = false;
  }

  show(): void {
    this.open = true;
  }

  isMine(): boolean {
    return this.mine;
  }

  turnMine(): void {
    this.mine = true;
  }

  isOpen(): boolean {
    return this.open;
  }

  getMinesAround(): number {
    return this.minesAround;
  }

  increaseMinesAround(): void {
    if (!this.isMine()) {
      this.minesAround++;
    }
  }
}
