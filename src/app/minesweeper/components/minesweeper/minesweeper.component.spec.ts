import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperComponent } from './minesweeper.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { TileComponent } from '../tile/tile.component';
import { GameStateService } from '../../services/game-state.service';
import { GameBoardService } from '../../services/game-board.service';
import { GameStatusImgDirective } from '../../directives/game-status-img.directive';
import { ControlPanelService } from '../../services/control-panel.service';

describe('MinesweeperComponent', () => {
  let component: MinesweeperComponent;
  let fixture: ComponentFixture<MinesweeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MinesweeperComponent,
        ControlPanelComponent,
        GameStatusImgDirective,
        GameBoardComponent,
        TileComponent
      ], 
      providers: [
        GameStateService,
        GameBoardService,
        ControlPanelService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
