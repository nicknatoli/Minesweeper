import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Tile } from '../../models/tile';
import { Observable } from 'rxjs/Observable';
import { Difficulty } from '../../models/contracts/difficulty';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @Input() newGame: Observable<Difficulty>;
  @Output() onGameOver = new EventEmitter<boolean>();
  @Output() onUpdateFlaggedTileCount = new EventEmitter<number>();
  public gameOver: boolean;
  public mineField: Array<Array<any>>;
  public flaggedTileCount: number;
  private firstClick: boolean;

  constructor(
    private gameBoardService: GameBoardService
  ) { }

  public ngOnInit(): void {
    this.newGame.subscribe((difficulty: Difficulty) => this.setupGame(difficulty));
  }

  public setupGame(difficulty: Difficulty): void {
    this.gameBoardService.initializeGameBoard(difficulty.height, difficulty.width, difficulty.mineCount);
    this.gameOver = false;
    this.firstClick = true;
    this.flaggedTileCount = 0;
    this.updateMineField();
  }

  public updateMineField(): void {
    this.mineField = this.gameBoardService.getMineField();
  }

  public onTileClick(tile: Tile): void {
    if(this.gameOver || tile.isFlagged) return;

    if(this.firstClick){
      this.gameBoardService.generateMines(tile.coordinates);
      this.firstClick = false;
    }

    if(!tile.isMine){
      this.gameBoardService.revealTile(tile);
    } else {
      this.gameBoardService.revealAllTiles();
      this.endGame(false);
    }

    if(this.gameBoardService.isGameWon()){
      this.gameBoardService.revealAllTiles();
      this.endGame(true);
    }

    this.updateMineField();
  }

  public endGame(gameWon: boolean): void {
    this.gameOver = true;
    this.onGameOver.emit(gameWon);
  }

  public onTileFlagged(): void {
    this.flaggedTileCount++;
    this.onUpdateFlaggedTileCount.emit(this.flaggedTileCount);
  }

  public onTileUnflagged(): void {
    this.flaggedTileCount--;
    this.onUpdateFlaggedTileCount.emit(this.flaggedTileCount);
  }
}
