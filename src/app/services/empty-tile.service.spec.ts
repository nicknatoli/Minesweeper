import { TestBed, inject } from '@angular/core/testing';

import { EmptyTileService } from './empty-tile.service';
import { GameBoard } from '../models/game-board';
import { GameBoardService } from './game-board.service';

describe('EmptyTileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmptyTileService, GameBoard, GameBoardService]
    });
  });

  it('should be created', inject([EmptyTileService], (service: EmptyTileService) => {
    expect(service).toBeTruthy();
  }));

  it('should assign correct adjacent tiles for a middle tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [4,4];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [3,3], [4,3], [5,3],
      [3,4],        [5,4],
      [3,5], [4,5], [5,5]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a top left corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [0,0];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
             [1,0],
      [0,1], [1,1]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a top right corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [7,0];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [6,0],
      [6,1], [7,1]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a bottom left corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [0,7];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [0,6], [1,6],
             [1,7]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a bottom right corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [7,7];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [6,6], [7,6],
      [6,7]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a left border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [0,4];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [0,3], [1,3],
             [1,4],
      [0,5], [1,5]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a top border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [4,0];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [3,0],        [5,0],
      [3,1], [4,1], [5,1]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a right border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [7,4];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [6,3], [7,3],
      [6,4], 
      [6,5], [7,5]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));

  it('should assign correct adjacent tiles for a bottom border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,10);
    let location = [4,7];
    let adjacentLocations: Array<[number,number]>;
    adjacentLocations = [
      [3,6], [4,6], [5,6],
      [3,7],        [5,7]
    ];
    let actualAjacentLocations = service.getAdjacentLocations(location[0], location[1]);
    expect(actualAjacentLocations).toEqual(adjacentLocations);
  }));
});
