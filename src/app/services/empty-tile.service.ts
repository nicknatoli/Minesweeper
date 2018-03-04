import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';
import { Tile } from '../models/contracts/tile';
import { EmptyTile } from '../models/empty-tile';

@Injectable()
export class EmptyTileService {

  constructor(private gameBoard: GameBoard) { }

  setAdjacentTileLocations(){
    let mineField = this.gameBoard.mineField;

    for(let y = 0; y < this.gameBoard.height; ++y){
      for(let x = 0; x < this.gameBoard.width; ++x){
        let adjacentTileLocations = this.getAdjacentLocations(x,y);
        let tile = mineField[y][x];
        if(tile instanceof EmptyTile){
          tile.adjacentTileLocations = adjacentTileLocations;
          this.caclulateMineCount(tile);
        }
      }
    }
  }

  private caclulateMineCount(tile: EmptyTile){
    for(let location of tile.adjacentTileLocations){
      let adjacentTile = this.gameBoard.mineField[location[1]][location[0]];
      if(adjacentTile.isMine){
        tile.mineCount++;
      }
    }
  }

  private getAdjacentLocations(xCoordinate, yCoordinate){
    let adjacentLocations = new Array<[number,number]>();
    let topLeftAdjacentLocation = [xCoordinate-1, yCoordinate-1];
    for(let i = 0; i < 3; ++i){
      let adjacentYCoordinate = topLeftAdjacentLocation[1] + i;
      if(!this.isValidYCoordinate(adjacentYCoordinate)) { continue; }
      for(let j = 0; j < 3; ++j){
        let adjacentXCoordinate = topLeftAdjacentLocation[0] + j; 
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
}
