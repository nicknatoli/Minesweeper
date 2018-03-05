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
  @Output() onGameOver = new EventEmitter();
  @Output() onGameWon = new EventEmitter();
  public gameOver = true;
  public mineField: Array<Array<any>>;

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.gameOver = false;
    this.updateMineField();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.gameCounter.currentValue > changes.gameCounter.previousValue){
      this.gameOver = false;
      this.updateMineField();
    }
  }

  updateMineField(){
    this.mineField = this.gameBoardService.getMineField();
  }

  onTileClick(tile: Tile){
    if(this.gameOver) { return; }

    if(!tile.isMine){
      this.gameBoardService.revealAdjacentTiles(tile);
    } else {
      this.gameBoardService.revealAllTiles();
      this.gameOver = true;
      this.onGameOver.emit();
    }

    if(this.gameBoardService.isGameWon()){
      this.onGameWon.emit();
      this.gameOver = true;
    }
    
    this.updateMineField();
  }

}
