export class Tile {
  public adjacentMineCount: number = 0;
  public isHidden: boolean = true;
  public isFlagged: boolean = false;

  constructor(
    public xCoordinate: number, 
    public yCoordinate: number, 
    public readonly isMine: boolean = false
  ) {}

  public reveal() {
    this.isHidden = false;
  }
}
