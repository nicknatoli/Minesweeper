import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardService } from './services/game-board.service';
import { TileComponent } from './components/tile/tile.component';
import { DifficultyService } from './services/difficulty.service';
import { GameStatusImgDirective } from './directives/game-status-img.directive';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    TileComponent,
    GameStatusImgDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameBoardService,
    DifficultyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
