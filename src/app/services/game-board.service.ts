import { Injectable } from '@angular/core';
import { GameBoard } from '../models/game-board';
import { Mine } from '../models/mine';
import { EmptyTile } from '../models/empty-tile';
import { Tile } from '../models/contracts/tile';
import { EmptyTileService } from './empty-tile.service';

@Injectable()
export class GameBoardService {

  constructor(private gameBoard: GameBoard, private tileService: EmptyTileService) { }

  getMineField(){
    return this.gameBoard.mineField;
  }

  getTile(xCoordinate, yCoordinate){
    return this.gameBoard.mineField[yCoordinate][xCoordinate];
  }

  revealAllTiles(){
    for(let row of this.gameBoard.mineField){
      for(let tile of row){
        tile.reveal();
      }
    }
  }

  revealAdjacentTiles(tile: Tile){
    if(tile.mineCount > 0){
      tile.reveal();
      return;
    }
    
    tile.reveal();
    for(let location of tile.adjacentTileLocations){
      let adjacentTile = this.gameBoard.mineField[location[1]][location[0]];
      if(adjacentTile.isHidden){
        this.revealAdjacentTiles(adjacentTile);
      }
    }
  }

  initializeGameBoard(height: number, width: number, mines: number){
    this.gameBoard.height = height;
    this.gameBoard.width = width;
    this.gameBoard.mines = mines;
    this.gameBoard.mineField = new Array<Array<Tile>>();

    this.createEmptyMineField();
    this.placeMines();
    this.tileService.setAdjacentTileLocations();
  }

  private createEmptyMineField(){
    for(let i = 0; i < this.gameBoard.height; ++i){
      let row = new Array<Tile>();
      for(let j = 0; j < this.gameBoard.width; ++j){
        row.push(new EmptyTile());
      }
      this.gameBoard.mineField.push(row);  
    }
  }

  private placeMines(){
    for(let location of this.generateMineLocations()){
      this.gameBoard.mineField[location[1]][location[0]] = new Mine();
    }
  }

  private generateMineLocations(){
    let mineLocations = new Array<[number,number]>();
    for(let i = 0; i < this.gameBoard.mines; ++i){
      let mineLocation = this.generateUniqueLocation(mineLocations);
      mineLocations.push(mineLocation);
    }
    return mineLocations;
  }

  private generateUniqueLocation(existingLocations: Array<[number, number]>){
    let uniqueLocation = this.generateRandomLocation();
    for(let location of existingLocations){
      if(uniqueLocation[0] == location[0] && uniqueLocation[1] == location[1]){
        return this.generateUniqueLocation(existingLocations);
      } 
    }
    return uniqueLocation;
  }

  private generateRandomLocation() : [number, number] {
    let xCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.width));
    let yCoordinate = Math.floor((Math.random()*1000 % this.gameBoard.height));
    return [xCoordinate, yCoordinate];
  }
}