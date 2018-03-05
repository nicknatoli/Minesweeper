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
  public gameCounter: number;
  public selectedDifficulty: any;
  private gameStatusElemRef: any;

  constructor(private gameBoardService: GameBoardService) {}

  ngOnInit(){
    this.selectedDifficulty = Difficulty.Beginner;
    this.gameCounter = 0;
    this.gameStatusElemRef = document.getElementById('game-status');
  }

  newGame() {
    let height = this.difficultyValues[this.selectedDifficulty][0];
    let width = this.difficultyValues[this.selectedDifficulty][1];
    let numberOfMines = this.difficultyValues[this.selectedDifficulty][2];
      
    this.gameBoardService.initializeGameBoard(height, width, numberOfMines);
    this.gameCounter++;

    this.gameStatusElemRef.style.background = "url(../assets/smileyface.jpg) no-repeat"; 
    this.gameStatusElemRef.style.backgroundSize = "cover"; 
  }

  onGameOver(){
    this.gameStatusElemRef.style.background = "url(../assets/sadface.jpg) no-repeat"; 
    this.gameStatusElemRef.style.backgroundSize = "cover"; 
  }

  updateGameStatusImage(){

  }
}
