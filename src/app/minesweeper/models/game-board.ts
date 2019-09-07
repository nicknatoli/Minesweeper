import { Coordinates} from "./contracts/coordinates";
import { Tile } from './tile';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";

const MAX_ADJACENT_ROWS = 3;
const MAX_ADJACENT_COLUMNS = 3;

export class GameBoard {
  private _mineField: BehaviorSubject<Tile>[][] = [];

  get mineField$(): Observable<Tile>[][] {
    return this._mineField.map(row => row.map(tile => tile.asObservable()));
  }

  constructor(
    public height: number,
    public width: number
  ) {
    this.initializeMineField();
  }

  private initializeMineField(): void {
    for (let y = 0; y < this.height; ++y) {
      let row = [];
      for (let x = 0; x < this.width; ++x) {
        const tile = new Tile({x: x, y: y});
        row.push(new BehaviorSubject<Tile>(tile));
      }
      this._mineField.push(row);
    }
  }

  public addMine(coordinates: Coordinates): void {
    const tile$ = this._mineField[coordinates.y][coordinates.x];
    const tile = tile$.value;
    tile.isMine = true;
    tile$.next(tile);

    for(const adjCoordinates of this.getAdjacentLocations(coordinates)){
      const adjacentTile$ = this.getTile(adjCoordinates);
      const adjacentTile = adjacentTile$.value; 
      if(!adjacentTile.isMine) {
        ++adjacentTile.adjacentMineCount;
        adjacentTile$.next(adjacentTile);
      }
    }
  }

  public revealTile(coordinates: Coordinates): void {
    const tile$ = this.getTile(coordinates);
    const tile = tile$.value;
    if (!tile.isHidden) return;
    
    tile.reveal();
    tile$.next(tile);

    if (tile.adjacentMineCount > 0) return;

    this.getAdjacentLocations(coordinates).forEach(x => this.revealTile(x));
  }

  private getTile(coordinates): BehaviorSubject<Tile> {
    return this._mineField[coordinates.y][coordinates.x];
  }

  public revealAllTiles(): void {
    for(const row of this._mineField){
      for(const tile$ of row){
        const tile = tile$.value;
        if(tile.isHidden){
          tile.reveal();
          tile$.next(tile);
        }
      }
    }
  }

  public getHiddenTileCount(): number {
    let hiddenTileCount = 0;
    for(const row of this._mineField){
      for(const tile$ of row){
        if(tile$.value.isHidden){
          ++hiddenTileCount;
        }
      }
    }
    return hiddenTileCount;
  }

  private getAdjacentLocations(coordinates: Coordinates): Coordinates[] {
    const adjacentLocations = [];
    const topLeftAdjacentLocation = { x: coordinates.x - 1, y: coordinates.y - 1} as Coordinates;

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
