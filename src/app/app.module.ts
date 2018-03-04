import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardService } from './services/game-board.service';
import { GameBoard } from './models/game-board';
import { EmptyTileService } from './services/empty-tile.service';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameBoard,
    GameBoardService,
    EmptyTileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
