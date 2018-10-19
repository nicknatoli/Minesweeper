import { Component, OnInit } from '@angular/core';
import { DifficultyType } from './enums/difficulty.enum';
import { Subject } from 'rxjs/Subject';
import { DifficultyService } from './services/difficulty.service';
import { Difficulty } from './models/contracts/difficulty';
import { GameStatus } from './enums/game-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public newGameSubject: Subject<Difficulty> = new Subject<Difficulty>();
  public gameStatus: GameStatus = GameStatus.New;
  public selectedDifficulty: Difficulty;
  public mineCount: number = 0;

  get difficulties(): Array<string> {
    return Object.keys(DifficultyType);
  }

  constructor(
    private readonly difficultyService: DifficultyService
  ) {}

  ngOnInit(){
    this.selectedDifficulty = this.difficultyService.getDifficulty(DifficultyType.Beginner);
  }

  public newGame() {
    this.newGameSubject.next(this.selectedDifficulty);
    this.gameStatus = GameStatus.New;
    this.mineCount = 0;
  }

  public setSelectedDifficulty(difficultyType: DifficultyType){
    this.selectedDifficulty = this.difficultyService.getDifficulty(difficultyType);
  }

  public onUpdateFlaggedTileCount(flaggedTileCount: number){
    this.mineCount = this.selectedDifficulty.mineCount - flaggedTileCount;
  }

  public onGameOver(gameWon: boolean){
    this.gameStatus = gameWon ? GameStatus.Won : GameStatus.Lost;
  }
}
