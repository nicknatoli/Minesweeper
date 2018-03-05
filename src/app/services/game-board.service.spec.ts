import { TestBed, inject } from '@angular/core/testing';

import { GameBoardService } from './game-board.service';
import { GameBoard } from '../models/game-board';
import { EmptyTileService } from './empty-tile.service';
import { Tile } from '../models/contracts/tile';
import { EmptyTile } from '../models/empty-tile';

describe('GameBoardService', () => {
  const BEGINNER = [8,8,10];
  const INTERMEDIATE = [16,16,40];
  const ADVANCED = [16,30,99];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameBoardService, 
        GameBoard,
        EmptyTileService
      ]
    });
  });

  it('should be created', inject([GameBoardService], (service: GameBoardService) => {
    expect(service).toBeTruthy();
  }));

  it('Initialize beginner GameBoard', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(BEGINNER[0],BEGINNER[1], BEGINNER[2]);
    let height = 0;
    let width = 0;
    let mines = 0;

    for(let row of service.getMineField()){
      ++height;
      for(let tile of row){
        ++width;
        if(tile.isMine){
          ++mines;
        }
      }
    }
    
    let actualGameBoard = [height, width/height, mines];
    expect(actualGameBoard).toEqual(BEGINNER);
  }));  

  it('Initialize intermediate GameBoard', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(INTERMEDIATE[0],INTERMEDIATE[1], INTERMEDIATE[2]);
    let height = 0;
    let width = 0;
    let mines = 0;

    for(let row of service.getMineField()){
      ++height;
      for(let tile of row){
        ++width;
        if(tile.isMine){
          ++mines;
        }
      }
    }
    
    let actualGameBoard = [height, width/height, mines];
    expect(actualGameBoard).toEqual(INTERMEDIATE);
  }));

  
  
  it('Initialize advanced GameBoard', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(ADVANCED[0],ADVANCED[1], ADVANCED[2]);
    let height = 0;
    let width = 0;
    let mines = 0;

    for(let row of service.getMineField()){
      ++height;
      for(let tile of row){
        ++width;
        if(tile.isMine){
          ++mines;
        }
      }
    }
    
    let actualGameBoard = [height, width/height, mines];
    expect(actualGameBoard).toEqual(ADVANCED);
  }));

  it('Tiles bordering a mine should not reveal additional tiles', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(BEGINNER[0],BEGINNER[1], BEGINNER[2]);
    let mineField = service.getMineField();
    let mineAdjacentTile: EmptyTile;
    for(let row of mineField){
      for(let tile of row){
        if(tile.mineCount > 0){
          mineAdjacentTile = tile;
          break;
        }
      }
    }
    
    service.revealAdjacentTiles(mineAdjacentTile);
    for(let location of mineAdjacentTile.adjacentTileLocations){
      expect(mineField[location[1]][location[0]].isHidden).toBeTruthy();
    }
  }));

  it('Tiles not bordering a mine should reveal adjacent tiles', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(BEGINNER[0],BEGINNER[1], BEGINNER[2]);
    let mineField = service.getMineField();
    let emptyTile: Tile;
    for(let row of mineField){
      for(let tile of row){
        if(tile.isMine) { continue; }
        if(tile.mineCount == 0){
          emptyTile = tile;
          break;
        }
      }
    }
    
    service.revealAdjacentTiles(emptyTile);
    for(let location of emptyTile.adjacentTileLocations){
      expect(mineField[location[1]][location[0]].isHidden).toBeFalsy();
    }
  }));

  it('revealAllTiles should reveal all tiles', inject([GameBoardService], (service: GameBoardService) => {
    service.initializeGameBoard(BEGINNER[0],BEGINNER[1], BEGINNER[2]);
    service.revealAllTiles();
    
    let mineField = service.getMineField();
    for(let row of mineField){
      for(let tile of row){
        expect(tile.isHidden).toBeFalsy();
      }
    }
  }));
});
