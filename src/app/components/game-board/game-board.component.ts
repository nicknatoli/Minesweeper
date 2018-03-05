import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  public mineField: Array<Array<any>>;

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.updateMineField();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.gameCounter.currentValue > changes.gameCounter.previousValue){
      this.updateMineField();
    }
  }

  updateMineField(){
    this.mineField = this.gameBoardService.getMineField();
  }

  onTileClick(tile: Tile){
    if(tile instanceof EmptyTile){
      this.gameBoardService.revealAdjacentTiles(tile);
    } else {
      tile.reveal();
    }
    
    this.updateMineField();
  }
}
