import { Coordinates} from "./contracts/coordinates";

export class Tile {
  public adjacentMineCount: number = 0;
  public isHidden: boolean = true;
  public isFlagged: boolean = false;
  public isMine: boolean = false;

  constructor(
    public coordinates: Coordinates
  ) {}

  public reveal(): void {
    this.isHidden = false;
    this.isFlagged = false;
  }
}
