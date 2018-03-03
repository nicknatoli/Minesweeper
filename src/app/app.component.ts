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
  ]
  public selectedDifficulty: any;
  public isGameBoardDefined: boolean;

  constructor(private gameBoardService: GameBoardService) {}

  ngOnInit(){
    this.selectedDifficulty = Difficulty.Beginner;
    this.isGameBoardDefined = false;
  }

  newGame() {
      let height = this.difficultyValues[this.selectedDifficulty][0];
      let width = this.difficultyValues[this.selectedDifficulty][1];
      let numberOfMines = this.difficultyValues[this.selectedDifficulty][2];
      
      this.gameBoardService.initializeGameBoard(height, width, numberOfMines);
      this.isGameBoardDefined = true;
  }
}
