import { Component } from '@angular/core';
import { GameBoardService } from './services/game-board.service';
import { Difficulty } from './enums/difficulty.enum';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';
import { scheduleMicroTask } from '@angular/core/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public difficulties = [
    [Difficulty.Beginner, "Beginner"],
    [Difficulty.Intermediate, "Intermediate"],
    [Difficulty.Advanced, "Advanced"]
  ];
  public difficultyValues = [
    [8,8,10],
    [16,16,40],
    [16,30,99]
  ];
  public mineCount: number;
  public gameCounter: number;
  public selectedDifficulty: any;
  private gameStatusElemRef: any;

  constructor(
    private gameBoardService: GameBoardService
  ) {}

  ngOnInit(){
    this.selectedDifficulty = Difficulty.Beginner;
    this.gameCounter = 0;
    this.mineCount = 0;
    this.gameStatusElemRef = document.getElementById('game-status');
  }

  newGame() {
    let height = this.difficultyValues[this.selectedDifficulty][0];
    let width = this.difficultyValues[this.selectedDifficulty][1];
    this.mineCount = this.difficultyValues[this.selectedDifficulty][2];
      
    this.gameBoardService.initializeGameBoard(height, width, this.mineCount);
    this.gameCounter++;

    this.gameStatusElemRef.style.background = "url(../assets/game_start.PNG) no-repeat"; 
    this.gameStatusElemRef.style.backgroundSize = "cover"; 
  }

  onUpdateFlaggedTileCount(flaggedTileCount: number){
    this.mineCount = this.difficultyValues[this.selectedDifficulty][2] - flaggedTileCount;
  }

  onGameLost(){
    this.gameStatusElemRef.style.background = "url(../assets/game_lost.PNG) no-repeat"; 
    this.gameStatusElemRef.style.backgroundSize = "cover"; 
  }

  onGameWon(){
    this.gameStatusElemRef.style.background = "url(../assets/game_won.PNG) no-repeat"; 
    this.gameStatusElemRef.style.backgroundSize = "cover"; 
  }
}
