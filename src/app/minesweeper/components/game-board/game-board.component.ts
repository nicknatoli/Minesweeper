import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Tile } from '../../models/tile';
import { Difficulty } from '../../models/contracts/difficulty';
import { GameStateService } from '../../services/game-state.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'minesweeper-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {
  public mineField$: Observable<Tile[][]>;
  
  private _gameOver: boolean = false;
  private _firstClick: boolean = true;
  private _newGameSubscription: Subscription;

  constructor(
    private _gameBoardService: GameBoardService,
    private _gameStateService: GameStateService
  ) { 
    this.mineField$ = this._gameBoardService.mineField$;
  }

  ngOnInit(): void {
    this._newGameSubscription = this._gameStateService.newGame$.subscribe((difficulty: Difficulty) => this.setupGame(difficulty));
  }

  ngOnDestroy(): void {
    this._newGameSubscription.unsubscribe();
  }

  public setupGame(difficulty: Difficulty): void {
    this._gameBoardService.initializeGameBoard(difficulty.height, difficulty.width, difficulty.mineCount);
    this._gameOver = false;
    this._firstClick = true;
  }

  public onTileClick(tile: Tile): void {
    if(this._gameOver || tile.isFlagged) return;

    if(this._firstClick){
      this._gameBoardService.generateMines(tile.coordinates);
      this._firstClick = false;
    }

    if(!tile.isMine){
      this._gameBoardService.revealTile(tile);
    } else {
      this._gameBoardService.revealAllTiles();
      this.endGame(false);
    }

    if(this._gameBoardService.isGameWon()){
      this._gameBoardService.revealAllTiles();
      this.endGame(true);
    }
  }

  public endGame(gameWon: boolean): void {
    this._gameOver = true;
    this._gameStateService.gameOver(gameWon);
  }
}
