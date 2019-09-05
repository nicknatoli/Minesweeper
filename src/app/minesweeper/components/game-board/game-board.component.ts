import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Tile } from '../../models/tile';
import { Difficulty } from '../../models/contracts/difficulty';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'minesweeper-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  public gameOver: boolean;
  public mineField: Array<Array<any>>;
  public flaggedTileCount: number;
  private firstClick: boolean;

  constructor(
    private gameBoardService: GameBoardService,
    private gameStateService: GameStateService
  ) { }

  public ngOnInit(): void {
    this.gameStateService.newGameObservable.subscribe((difficulty: Difficulty) => 
      this.setupGame(difficulty));
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
    this.gameStateService.gameOver(gameWon);
  }
}
