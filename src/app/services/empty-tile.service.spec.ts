import { TestBed, inject } from '@angular/core/testing';

import { EmptyTileService } from './empty-tile.service';
import { GameBoard } from '../models/game-board';
import { GameBoardService } from './game-board.service';
import { Tile } from '../models/contracts/tile';
import { EmptyTile } from '../models/empty-tile';

describe('EmptyTileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmptyTileService, GameBoard, GameBoardService]
    });
  });

  it('should be created', inject([EmptyTileService], (service: EmptyTileService) => {
    expect(service).toBeTruthy();
  }));

  it('should assign correct adjacent tile locations for a middle tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [4,4];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [3,3], [4,3], [5,3],
      [3,4],        [5,4],
      [3,5], [4,5], [5,5]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations;    
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a top left corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [0,0];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
             [1,0],
      [0,1], [1,1]
    ];

    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a top right corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [7,0];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [6,0],
      [6,1], [7,1]
    ];

    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a bottom left corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [0,7];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [0,6], [1,6],
             [1,7]
    ];

    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a bottom right corner tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [7,7];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [6,6], [7,6],
      [6,7]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a left border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [0,4];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [0,3], [1,3],
             [1,4],
      [0,5], [1,5]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a top border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [4,0];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [3,0],        [5,0],
      [3,1], [4,1], [5,1]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a right border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [7,4];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [6,3], [7,3],
      [6,4], 
      [6,5], [7,5]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));

  it('should assign correct adjacent tile locations for a bottom border tile', inject([EmptyTileService, GameBoardService], (service: EmptyTileService, gameBoard: GameBoardService) => {
    gameBoard.initializeGameBoard(8,8,0);
    let location = [4,7];
    let expecteAdjacentLocations: Array<[number,number]>;
    expecteAdjacentLocations = [
      [3,6], [4,6], [5,6],
      [3,7],        [5,7]
    ];
    
    service.setAdjacentTileLocations();
    let actualTile = gameBoard.getTile(location[0], location[1]);
    let actualAjacentLocations = actualTile.adjacentTileLocations; 
    expect(actualAjacentLocations).toEqual(expecteAdjacentLocations);
  }));
});
