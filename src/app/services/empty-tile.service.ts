import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';

@Injectable()
export class EmptyTileService {

  constructor(private gameBoard: GameBoard) { }

  getAdjacentLocations(xCoordinate, yCoordinate){
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

  private isValidMineFieldLocation(xCoordinate, yCoordinate){
    return xCoordinate < this.gameBoard.width  && xCoordinate >= 0 &&
           yCoordinate < this.gameBoard.height && yCoordinate >= 0;
  }
}
