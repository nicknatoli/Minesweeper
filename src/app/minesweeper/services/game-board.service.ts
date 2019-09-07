import { Injectable } from '@angular/core';
import { Coordinates } from "../models/contracts/coordinates"
import { GameBoard } from '../models/game-board';
import { Tile } from '../models/tile';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameBoardService {
  private _gameBoard: GameBoard;
  private _mineCount: number;
  private _mineField$: Subject<Tile[][]> = new Subject<Tile[][]>();

  get mineField$(): Observable<Tile[][]> { return this._mineField$.asObservable(); }

  public initializeGameBoard(height: number, width: number, mineCount: number): void{
    this._gameBoard = new GameBoard(height, width);
    this._mineCount = mineCount;
    this._mineField$.next(this._gameBoard.mineField);
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
    this._mineField$.next(this._gameBoard.mineField);
  }

  public revealAllTiles(): void {
    this._gameBoard.revealAllTiles();
    this._mineField$.next(this._gameBoard.mineField);
  }

  public isGameWon(): boolean { 
    return this._gameBoard.getHiddenTileCount() === this._mineCount;
  }
}