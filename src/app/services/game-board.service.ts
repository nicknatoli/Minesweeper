import { Injectable } from '@angular/core';
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

  public generateMines(initialXCoordinate: number, initialYCoordinate: number): void {
    this.generateMineLocations([initialXCoordinate, initialYCoordinate])
      .forEach(x => this.gameBoard.addMine(x[0], x[1]));
  }

  private generateMineLocations(safeTileLocation: [number,number]): Array<[number, number]> {
    let mineLocations = new Array<[number,number]>();
    while(mineLocations.length < this.mineCount){
      let mineLocation = this.generateUniqueLocation(mineLocations);
      if(mineLocation[0] != safeTileLocation[0] && mineLocation[1] != safeTileLocation[1]){
        mineLocations.push(mineLocation);
      }
    }
    return mineLocations;
  }

  private generateUniqueLocation(existingLocations: Array<[number, number]>): [number, number] {
    let uniqueLocation = this.generateRandomLocation();
    for(let location of existingLocations){
      if(uniqueLocation[0] == location[0] && uniqueLocation[1] == location[1]){
        return this.generateUniqueLocation(existingLocations);
      } 
    }
    return uniqueLocation;
  }

  private generateRandomLocation(): [number, number] {
    let xCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.width));
    let yCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.height));
    return [xCoordinate, yCoordinate];
  }

  public revealTile(tile: Tile): void {
    this.gameBoard.revealTile(tile.xCoordinate, tile.yCoordinate);
  }

  public revealAllTiles(): void {
    this.gameBoard.revealAllTiles();
  }

  public isGameWon(): boolean { 
    return this.gameBoard.getHiddenTileCount() === this.mineCount;
  }
}