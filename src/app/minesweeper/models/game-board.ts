import { Coordinates} from "./contracts/coordinates";
import { Tile } from './tile';

export class GameBoard {
  public readonly mineField: Tile[][] = [];

  constructor(
    public height: number,
    public width: number
  ) {
    this.initializeMineField();
  }

  public initializeMineField(): void {
    for (let y = 0; y < this.height; ++y) {
      let row = [];
      for (let x = 0; x < this.width; ++x) {
        row.push(new Tile({x: x, y: y}));
      }
      this.mineField.push(row);
    }
  }

  public getTile(coordinates): Tile {
    return this.mineField[coordinates.y][coordinates.x];
  }

  public addMine(coordinates: Coordinates): void {
    this.mineField[coordinates.y][coordinates.x] = new Tile(coordinates, true);
    for(let adjCoordinates of this.getAdjacentLocations(coordinates)){
      let tile = this.getTile(adjCoordinates);
      if(!tile.isMine) tile.adjacentMineCount++;
    }
  }

  public revealTile(coordinates: Coordinates): void {
    let tile = this.getTile(coordinates);
    if (!tile.isHidden) return;
    tile.reveal();
    if (tile.adjacentMineCount > 0) return;
    for(let adjCoordinates of this.getAdjacentLocations(coordinates)){
      this.revealTile(adjCoordinates);
    }
  }

  public revealAllTiles(): void {
    this.mineField.forEach(row =>
      row.forEach(tile => tile.reveal()));
  }

  public getHiddenTileCount(): number {
    let hiddenTileCount = 0;
    for(let row of this.mineField){
      for(let tile of row){
        if(tile.isHidden){
          ++hiddenTileCount;
        }
      }
    }
    return hiddenTileCount;
  }

  private getAdjacentLocations(coordinates: Coordinates): Coordinates[] {
    const MAX_ADJACENT_ROWS = 3;
    const MAX_ADJACENT_COLUMNS = 3;
    let adjacentLocations = [];
    let topLeftAdjacentLocation = { x: coordinates.x - 1, y: coordinates.y - 1} as Coordinates;

    for (let y = 0; y < MAX_ADJACENT_ROWS; ++y) {
      let adjacentYCoordinate = topLeftAdjacentLocation.y + y;
      if (!this.isValidYCoordinate(adjacentYCoordinate)) continue;
      for (let x = 0; x < MAX_ADJACENT_COLUMNS; ++x) {
        let adjacentXCoordinate = topLeftAdjacentLocation.x + x;
        if (!this.isValidXCoordinate(adjacentXCoordinate)) continue;
        if (adjacentXCoordinate != coordinates.x || adjacentYCoordinate != coordinates.y) {
          adjacentLocations.push({x: adjacentXCoordinate, y: adjacentYCoordinate});
        }
      }
    }
    return adjacentLocations;
  }

  private isValidYCoordinate(yCoordinate) {
    return yCoordinate < this.height && yCoordinate >= 0;
  }

  private isValidXCoordinate(xCoordinate) {
    return xCoordinate < this.width && xCoordinate >= 0;
  }
}
