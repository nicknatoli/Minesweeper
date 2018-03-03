import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../services/game-board.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  public mineField: Array<Array<any>>;

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.mineField = this.gameBoardService.getMineField();
  }
}
