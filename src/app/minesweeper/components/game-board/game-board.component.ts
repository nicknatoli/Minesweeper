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
  public mineField$: Observable<Observable<Tile>[][]>;

  private _isGameOver: boolean = false;
  private _isFirstClick: boolean = true;
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
    this._isGameOver = false;
    this._isFirstClick = true;
  }

  public onTileClick(tile: Tile): void {
    if(this._isGameOver || tile.isFlagged) return;

    if(this._isFirstClick){
      this._gameBoardService.generateMines(tile.coordinates);
      this._isFirstClick = false;
    }

    if(tile.isMine){
      this.mineTileClicked(tile);
    } else {
      this.emptyTileClicked(tile);
    }
  }

  private mineTileClicked(tile: Tile): void {
    this._gameBoardService.revealAllTiles();
    this.endGame(false);
  }

  private emptyTileClicked(tile: Tile): void {
    this._gameBoardService.revealTile(tile);

    if(this._gameBoardService.isGameWon()){
      this._gameBoardService.revealAllTiles();
      this.endGame(true);
    }
  }

  public onTileRightClick(event: MouseEvent, tile: Tile): void {
    event.preventDefault();
    if(this._isGameOver) return;

    tile.isFlagged = !tile.isFlagged;
    if (tile.isFlagged) {
      this._gameStateService.flagTile();
    } else {
      this._gameStateService.unflagTile();
    }
  }

  private endGame(gameWon: boolean): void {
    this._isGameOver = true;
    this._gameStateService.gameOver(gameWon);
  }
}
