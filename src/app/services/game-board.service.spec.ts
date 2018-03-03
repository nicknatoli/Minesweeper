import { TestBed, inject } from '@angular/core/testing';

import { GameBoardService } from './game-board.service';
import { GameBoard } from '../models/game-board';

describe('GameBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameBoardService, 
        GameBoard
      ]
    });
  });

  it('should be created', inject([GameBoardService], (service: GameBoardService) => {
    expect(service).toBeTruthy();
  }));

  it('Initialize empty beginner GameBoard', inject([GameBoardService], (service: GameBoardService) => {
    let expectedMinefield = new Array<Array<any>>();
    let emptyBeginnerMineFieldRow = [false, false, false, false, false, false, false, false];
    
    for(let i = 0; i < 8; ++i){
      expectedMinefield.push(emptyBeginnerMineFieldRow);      
    }
    
    service.initializeGameBoard(8,8,0);
    let actualMinefield = service.getMineField();
    expect(expectedMinefield).toEqual(actualMinefield);
  }));  
});
