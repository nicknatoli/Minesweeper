import { Coordinates} from "./contracts/coordinates";

export class Tile {
  public adjacentMineCount: number = 0;
  public isHidden: boolean = true;
  public isFlagged: boolean = false;

  constructor(
    public coordinates: Coordinates, 
    public readonly isMine: boolean = false
  ) {}

  public reveal() {
    this.isHidden = false;
  }
}
