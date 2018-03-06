import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';
import { Tile } from '../models/contracts/tile';
import { EmptyTile } from '../models/empty-tile';

@Injectable()
export class EmptyTileService {

  constructor(
    private gameBoard: GameBoard
  ) { }

  setAdjacentTileAttributes(){
    let mineField = this.gameBoard.mineField;

    for(let y = 0; y < this.gameBoard.height; ++y){
      for(let x = 0; x < this.gameBoard.width; ++x){
        let tile = mineField[y][x];
        if(!tile.isMine){
          let adjacentTileLocations = this.getAdjacentLocations(x,y);
          tile.adjacentTileLocations = adjacentTileLocations;
          this.caclulateAdjacentMineCount(tile);
        }
      }
    }
  }

  private getAdjacentLocations(xCoordinate, yCoordinate){
    const MAX_ADJACENT_ROWS = 3;
    const MAX_ADJACENT_COLUMNS = 3;
    let adjacentLocations = new Array<[number,number]>();
    let topLeftAdjacentLocation = [xCoordinate-1, yCoordinate-1];
    
    for(let y = 0; y < MAX_ADJACENT_ROWS; ++y){
      let adjacentYCoordinate = topLeftAdjacentLocation[1] + y;
      if(!this.isValidYCoordinate(adjacentYCoordinate)) { continue; }
      for(let x = 0; x < MAX_ADJACENT_COLUMNS ; ++x){
        let adjacentXCoordinate = topLeftAdjacentLocation[0] + x; 
        if(!this.isValidXCoordinate(adjacentXCoordinate)) { continue; }
        if(adjacentXCoordinate != xCoordinate || adjacentYCoordinate != yCoordinate){
          adjacentLocations.push([adjacentXCoordinate, adjacentYCoordinate]);
        }
      }
    }
    return adjacentLocations;
  }

  private isValidYCoordinate(yCoordinate){
    return yCoordinate < this.gameBoard.height && yCoordinate >= 0;
  }

  private isValidXCoordinate(xCoordinate){
    return xCoordinate < this.gameBoard.width && xCoordinate >= 0;
  }

  private caclulateAdjacentMineCount(tile: Tile){
    for(let location of tile.adjacentTileLocations){
      let adjacentTile = this.gameBoard.mineField[location[1]][location[0]];
      if(adjacentTile.isMine){
        tile.adjacentMineCount++;
      }
    }
  }
}