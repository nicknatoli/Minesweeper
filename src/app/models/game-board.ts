import { Tile } from './tile';

export class GameBoard {
  public readonly mineField: Array<Array<Tile>> = [];

  constructor(
    public height: number,
    public width: number
  ) {
    this.initializeMineField();
  }

  public initializeMineField(): void {
    for (let y = 0; y < this.height; ++y) {
      let row = new Array<Tile>();
      for (let x = 0; x < this.width; ++x) {
        row.push(new Tile(x, y));
      }
      this.mineField.push(row);
    }
  }

  public getTile(x: number, y: number): Tile {
    return this.mineField[y][x];
  }

  public addMine(x: number, y: number): void {
    this.mineField[y][x] = new Tile(x, y, true);
    for(let coordinate of this.getAdjacentLocations(x,y)){
      let tile = this.getTile(coordinate[0], coordinate[1]);
      if(!tile.isMine) tile.adjacentMineCount++;
    }
  }

  public revealTile(x: number, y: number): void {
    let tile = this.getTile(x, y);
    if (!tile.isHidden) return;
    tile.reveal();
    if (tile.adjacentMineCount > 0) return;
    for(let coordinate of this.getAdjacentLocations(x,y)){
      this.revealTile(coordinate[0], coordinate[1]);
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

  private getAdjacentLocations(xCoordinate, yCoordinate): Array<[number, number]> {
    const MAX_ADJACENT_ROWS = 3;
    const MAX_ADJACENT_COLUMNS = 3;
    let adjacentLocations = new Array<[number, number]>();
    let topLeftAdjacentLocation = [xCoordinate - 1, yCoordinate - 1];

    for (let y = 0; y < MAX_ADJACENT_ROWS; ++y) {
      let adjacentYCoordinate = topLeftAdjacentLocation[1] + y;
      if (!this.isValidYCoordinate(adjacentYCoordinate)) continue;
      for (let x = 0; x < MAX_ADJACENT_COLUMNS; ++x) {
        let adjacentXCoordinate = topLeftAdjacentLocation[0] + x;
        if (!this.isValidXCoordinate(adjacentXCoordinate)) continue;
        if (adjacentXCoordinate != xCoordinate || adjacentYCoordinate != yCoordinate) {
          adjacentLocations.push([adjacentXCoordinate, adjacentYCoordinate]);
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
