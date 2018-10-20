import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardService } from './services/game-board.service';
import { TileComponent } from './components/tile/tile.component';
import { GameStateService } from './services/game-state.service';
import { GameStatusImgDirective } from './directives/game-status-img.directive';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ControlPanelService } from './services/control-panel.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    TileComponent,
    GameStatusImgDirective,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameBoardService,
    GameStateService,
    ControlPanelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
