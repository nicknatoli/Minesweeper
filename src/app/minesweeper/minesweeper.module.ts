import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { GameStatusImgDirective } from './directives/game-status-img.directive';
import { TileComponent } from './components/tile/tile.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MinesweeperComponent } from './components/minesweeper/minesweeper.component';
import { GameBoardService } from './services/game-board.service';
import { GameStateService } from './services/game-state.service';
import { ControlPanelService } from './services/control-panel.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ControlPanelComponent,
    GameBoardComponent,
    GameStatusImgDirective,
    TileComponent,
    MinesweeperComponent
  ],
  providers: [
    GameBoardService,
    GameStateService,
    ControlPanelService
  ],
  exports: [
    MinesweeperComponent
  ]
})
export class MinesweeperModule { }
