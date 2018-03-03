import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameBoardService } from '../services/game-board.service';
import { GameBoard } from '../models/game-board';
import { AppComponent } from '../app.component';

describe('GameBoardComponent', () => {
  let parentComponent: AppComponent;
  let component: GameBoardComponent;
  let parentFixture: ComponentFixture<AppComponent>;
  let fixture: ComponentFixture<GameBoardComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardComponent, AppComponent ],
      providers: [
        GameBoardService, 
        GameBoard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(GameBoardComponent);
    
    parentComponent = parentFixture.componentInstance;
    component = fixture.componentInstance;
    
    parentFixture.detectChanges();
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
    
    parentComponent.newGame();
    component.ngOnInit();
    expect(expectedMinefield).toEqual(component.mineField);
  })
});
