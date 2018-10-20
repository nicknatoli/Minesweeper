import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../../enums/game-status.enum';
import { DifficultyType } from '../../enums/difficulty.enum';
import { GameStateService } from '../../services/game-state.service';
import { ControlPanelService } from '../../services/control-panel.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  public gameStatus: GameStatus = GameStatus.New;
  public selectedDifficulty: DifficultyType = DifficultyType.Beginner;
  public mineCount: number = 0;

  get difficulties(): Array<string> {
    return Object.keys(DifficultyType);
  }

  constructor(
    private readonly gameStateService: GameStateService,
    private readonly controlPanelService: ControlPanelService
  ) {}

  ngOnInit(){
    this.gameStateService.gameOverObservable.subscribe((gameWon: boolean) => 
      this.gameStatus = gameWon ? GameStatus.Won : GameStatus.Lost);

    this.gameStateService.tileFlaggedObservable.subscribe(() => this.mineCount--);
    this.gameStateService.tileUnflaggedObservable.subscribe(() => this.mineCount++);
  }

  public newGame() {
    let difficulty = this.controlPanelService.getDifficulty(this.selectedDifficulty)
    this.mineCount = difficulty.mineCount;
    this.gameStatus = GameStatus.New;
    this.gameStateService.newGame(difficulty);
  }
}
