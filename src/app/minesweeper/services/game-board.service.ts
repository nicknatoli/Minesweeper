import { Injectable } from '@angular/core';
import { Coordinates } from "../models/contracts/coordinates"
import { GameBoard } from '../models/game-board';
import { Tile } from '../models/tile';

@Injectable()
export class GameBoardService {
  private gameBoard: GameBoard;
  private mineCount: number;

  public getMineField(): Array<Array<Tile>> {
    return this.gameBoard.mineField;
  }

  public initializeGameBoard(height: number, width: number, mineCount: number): void{
    this.gameBoard = new GameBoard(height, width);
    this.mineCount = mineCount;
  }

  public generateMines(initialClickCooridinates: Coordinates): void {
    this.generateMineCoordinates(initialClickCooridinates)
      .forEach(x => this.gameBoard.addMine(x));
  }

  private generateMineCoordinates(safeTile: Coordinates): Array<Coordinates> {
    let mines = new Array<Coordinates>();
    while(mines.length < this.mineCount){
      let mine = this.generateUniqueCoordinates(mines);
      if(mine.x != safeTile.x && mine.y != safeTile.y){
        mines.push(mine);
      }
    }
    return mines;
  }

  private generateUniqueCoordinates(existingCoordinates: Array<Coordinates>): Coordinates {
    let uniqueCoordinates = this.generateRandomCoordinates();
    for(let coordinates of existingCoordinates){
      if(uniqueCoordinates.x === coordinates.x && uniqueCoordinates.y === coordinates.y){
        return this.generateUniqueCoordinates(existingCoordinates);
      } 
    }
    return uniqueCoordinates;
  }

  private generateRandomCoordinates(): Coordinates {
    let xCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.width));
    let yCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.height));
    return {x: xCoordinate, y: yCoordinate};
  }

  public revealTile(tile: Tile): void {
    this.gameBoard.revealTile(tile.coordinates);
  }

  public revealAllTiles(): void {
    this.gameBoard.revealAllTiles();
  }

  public isGameWon(): boolean { 
    return this.gameBoard.getHiddenTileCount() === this.mineCount;
  }
}