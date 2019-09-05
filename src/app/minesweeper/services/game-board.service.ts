import { Injectable } from '@angular/core';
import { Coordinates } from "../models/contracts/coordinates"
import { GameBoard } from '../models/game-board';
import { Tile } from '../models/tile';

@Injectable()
export class GameBoardService {
  private _gameBoard: GameBoard;
  private _mineCount: number;

  public getMineField(): Tile[][] {
    return this._gameBoard._mineField;
  }

  public initializeGameBoard(height: number, width: number, mineCount: number): void{
    this._gameBoard = new GameBoard(height, width);
    this._mineCount = mineCount;
  }

  public generateMines(initialClickCooridinates: Coordinates): void {
    this.generateMineCoordinates(initialClickCooridinates)
      .forEach(x => this._gameBoard.addMine(x));
  }

  private generateMineCoordinates(safeTile: Coordinates): Coordinates[] {
    let mines = [];
    while(mines.length < this._mineCount){
      let mine = this.generateUniqueCoordinates(mines);
      if(mine.x != safeTile.x && mine.y != safeTile.y){
        mines.push(mine);
      }
    }
    return mines;
  }

  private generateUniqueCoordinates(existingCoordinates: Coordinates[]): Coordinates {
    let uniqueCoordinates = this.generateRandomCoordinates();
    for(let coordinates of existingCoordinates){
      if(uniqueCoordinates.x === coordinates.x && uniqueCoordinates.y === coordinates.y){
        return this.generateUniqueCoordinates(existingCoordinates);
      } 
    }
    return uniqueCoordinates;
  }

  private generateRandomCoordinates(): Coordinates {
    let xCoordinate = Math.floor((Math.random()*1000 % this._gameBoard.width));
    let yCoordinate = Math.floor((Math.random()*1000 % this._gameBoard.height));
    return {x: xCoordinate, y: yCoordinate};
  }

  public revealTile(tile: Tile): void {
    this._gameBoard.revealTile(tile.coordinates);
  }

  public revealAllTiles(): void {
    this._gameBoard.revealAllTiles();
  }

  public isGameWon(): boolean { 
    return this._gameBoard.getHiddenTileCount() === this._mineCount;
  }
}