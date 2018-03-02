import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameBoardService } from '../services/game-board.service';
import { GameBoard } from '../models/game-board';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardComponent ],
      providers: [
        GameBoardService, 
        GameBoard
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

  it('The gameboard has been initialized to beginner', () => {
    let expectedMinefield = new Array<Array<any>>();
    let emptyBeginnerMineFieldRow = [false, false, false, false, false, false, false, false];
    
    for(let i = 0; i < 8; ++i){
      expectedMinefield.push(emptyBeginnerMineFieldRow);      
    }
    
    expect(expectedMinefield).toEqual(component.mineField);
  })
});
