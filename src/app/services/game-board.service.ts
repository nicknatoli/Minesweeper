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

  isGameWon(){
    let tilesRevealed = 0;
    for(let row of this.gameBoard.mineField){
      for(let tile of row){
        if(!tile.isHidden){
          ++tilesRevealed;
        }
      }
    }

    let totalTiles = this.gameBoard.height*this.gameBoard.width;
    let remainingTiles = totalTiles - tilesRevealed;
    return remainingTiles == this.gameBoard.mines;
  }

  revealAllTiles(){
    for(let row of this.gameBoard.mineField){
      for(let tile of row){
        tile.reveal();
      }
    }
  }

  revealAdjacentTiles(tile: Tile){
    if(tile.adjacentMineCount > 0){
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
  }

  private createEmptyMineField(){
    for(let y = 0; y < this.gameBoard.height; ++y){
      let row = new Array<Tile>();
      for(let x = 0; x < this.gameBoard.width; ++x){
        row.push(new EmptyTile(x,y));
      }
      this.gameBoard.mineField.push(row);  
    }
  }

  public generateMines(initialClickXCoordinate: number, initialClickYCoordinate: number){
    this.placeMines([initialClickXCoordinate, initialClickYCoordinate]);
    this.tileService.setAdjacentTileLocations();
  }

  private placeMines(safeTileLocation: [number,number]){
    for(let location of this.generateMineLocations(safeTileLocation)){
      this.gameBoard.mineField[location[1]][location[0]] = new Mine(location[0], location[1]);
    }
  }

  private generateMineLocations(safeTileLocation: [number,number]){
    let mineLocations = new Array<[number,number]>();
    while(mineLocations.length < this.gameBoard.mines){
      let mineLocation = this.generateUniqueLocation(mineLocations);
      if(mineLocation[0] != safeTileLocation[0] && mineLocation[1] != safeTileLocation[1]){
        mineLocations.push(mineLocation);
      }
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