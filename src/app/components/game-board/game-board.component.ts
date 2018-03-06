import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GameBoardService } from '../../services/game-board.service';
import { Tile } from '../../models/contracts/tile';
import { EmptyTile } from '../../models/empty-tile';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @Input() gameCounter: number;
  @Output() onGameLost = new EventEmitter();
  @Output() onGameWon = new EventEmitter();
  @Output() onUpdateFlaggedTileCount = new EventEmitter<number>();
  public gameOver: boolean;
  public mineField: Array<Array<any>>;
  public flaggedTileCount: number;
  private firstClick: boolean;

  constructor(
    private gameBoardService: GameBoardService
  ) { }

  ngOnInit() {
    this.setupGame();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.gameCounter.currentValue > changes.gameCounter.previousValue){
      this.setupGame();
    }
  }

  setupGame(){
    this.gameOver = false;
    this.firstClick = true;
    this.flaggedTileCount = 0;
    this.updateMineField();
  }

  updateMineField(){
    this.mineField = this.gameBoardService.getMineField();
  }

  onTileClick(tile: Tile){
    if(this.gameOver || tile.isFlagged) { return; }

    if(this.firstClick){
      this.gameBoardService.generateMines(tile.xCoordinate, tile.yCoordinate);
      this.firstClick = false;
    }

    if(!tile.isMine){
      this.gameBoardService.revealAdjacentTiles(tile);
    } else {
      this.gameBoardService.revealAllTiles();
      this.onGameLost.emit();
      this.endGame();
    }

    if(this.gameBoardService.isGameWon()){
      this.gameBoardService.revealAllTiles();
      this.onGameWon.emit();
      this.endGame();
    }

    this.updateMineField();
  }

  endGame(){
    this.gameOver = true;
  }

  onTileFlagged(){
    this.flaggedTileCount++;
    this.onUpdateFlaggedTileCount.emit(this.flaggedTileCount);
  }

  onTileUnflagged(){
    this.flaggedTileCount--;
    this.onUpdateFlaggedTileCount.emit(this.flaggedTileCount);
  }
}
