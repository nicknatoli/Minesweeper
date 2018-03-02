import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';

@Injectable()
export class GameBoardService {

  constructor(private gameBoard: GameBoard) { }

  initializeGameBoard(height: number, width: number){
    this.gameBoard.height = height;
    this.gameBoard.width = width;
    this.gameBoard.mineField = new Array<Array<any>>();

    for(let i = 0; i < height; ++i){
      let row = new Array<any>();
      for(let j = 0; j < width; ++j){
        row.push(false);
      }
      this.gameBoard.mineField.push(row);
    } 
  }

  getMineField(){
    return this.gameBoard.mineField;
  }

}
