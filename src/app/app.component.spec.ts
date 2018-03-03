import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardService } from './services/game-board.service';
import { GameBoard } from './models/game-board';
import { Difficulty } from './enums/difficulty.enum';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const BEGINNER = [8,8];
  const INTERMEDIATE = [16,16];
  const ADVANCED = [16,30];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameBoardComponent
      ],
      providers:[
        GameBoardService, 
        GameBoard
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('default selected difficulty should be beginner', async(() => {
    expect(component.selectedDifficulty).toEqual(Difficulty.Beginner);
  }));

  it('The gameboard has been initialized to beginner', inject([GameBoardService], (service: GameBoardService)  => {
    component.selectedDifficulty = Difficulty.Beginner;
    component.newGame();
    let mineField = service.getMineField();
    let expectedBoardSize = [mineField.length, mineField[0].length]
    expect(BEGINNER).toEqual(expectedBoardSize);
  }));

  it('The gameboard has been initialized to intermediate', inject([GameBoardService], (service: GameBoardService)  => {
    component.selectedDifficulty = Difficulty.Intermediate;
    component.newGame();
    let mineField = service.getMineField();
    let expectedBoardSize = [mineField.length, mineField[0].length]
    expect(INTERMEDIATE).toEqual(expectedBoardSize);
  }));

  it('The gameboard has been initialized to advanced', inject([GameBoardService], (service: GameBoardService)  => {
    component.selectedDifficulty = Difficulty.Advanced;
    component.newGame();
    let mineField = service.getMineField();
    let expectedBoardSize = [mineField.length, mineField[0].length]
    expect(ADVANCED).toEqual(expectedBoardSize);
  }));

  it('The gameboard can be reinitialized', inject([GameBoardService], (service: GameBoardService)  => {
    component.selectedDifficulty = Difficulty.Beginner;
    component.newGame();
    component.selectedDifficulty = Difficulty.Intermediate;
    component.newGame();
    let mineField = service.getMineField();
    let expectedBoardSize = [mineField.length, mineField[0].length]
    expect(INTERMEDIATE).toEqual(expectedBoardSize);
  }));
});
