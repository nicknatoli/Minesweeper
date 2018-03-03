import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardService } from './services/game-board.service';
import { GameBoard } from './models/game-board';
import { Difficulty } from './enums/difficulty.enum';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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

  it('default difficulty should be beginner', async(() => {
    expect(component.selectedDifficulty).toEqual(Difficulty.Beginner);
  }));
});
