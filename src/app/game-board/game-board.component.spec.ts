import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameBoardService } from '../services/game-board.service';
import { GameBoard } from '../models/game-board';
import { AppComponent } from '../app.component';
import { Difficulty } from '../enums/difficulty.enum';
import { EmptyTileService } from '../services/empty-tile.service';


describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  const BEGINNER = [8,8,10];
  const INTERMEDIATE = [16,16,40];
  const ADVANCED = [16,30,99];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardComponent, AppComponent ],
      providers: [
        GameBoardService, 
        GameBoard,
        EmptyTileService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The gameboard has been initialized to beginner', inject([GameBoardService], (service: GameBoardService)  => {
    service.initializeGameBoard(BEGINNER[0],BEGINNER[1], BEGINNER[3]);
    component.updateMineField();
    let mineField = service.getMineField();
    let expectedBoardSize = [mineField.length, mineField[0].length]
    let actualBoardSize = [component.mineField.length, component.mineField[0].length];
    expect(expectedBoardSize).toEqual(actualBoardSize);
  }));
});
