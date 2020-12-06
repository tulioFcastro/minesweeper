export class Field {
  private minesAround: number;
  private open: boolean;
  private mine: boolean;
  rowPosition: number;
  colPosition: number;

  constructor(rowPosition: number, colPosition: number) {
    this.minesAround = 0;
    this.open = false;
    this.mine = false;
    this.rowPosition = rowPosition;
    this.colPosition = colPosition;
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
