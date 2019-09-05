import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStatus } from '../../enums/game-status.enum';
import { DifficultyType } from '../../enums/difficulty.enum';
import { GameStateService } from '../../services/game-state.service';
import { ControlPanelService } from '../../services/control-panel.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'minesweeper-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  public gameStatus: GameStatus = GameStatus.New;
  public selectedDifficulty: DifficultyType = DifficultyType.Beginner;
  public mineCount: number = 0;
  public difficulties: DifficultyType[] = Object.keys(DifficultyType).map(key => DifficultyType[key]);

  private _gameStateSubscriptions: Subscription = new Subscription();

  constructor(
    private readonly _gameStateService: GameStateService,
    private readonly _controlPanelService: ControlPanelService
  ) {}

  ngOnInit(): void {
    this._gameStateSubscriptions.add(this._gameStateService.gameOver$.subscribe((gameWon: boolean) => this.gameStatus = gameWon ? GameStatus.Won : GameStatus.Lost));
    this._gameStateSubscriptions.add(this._gameStateService.tileFlagged$.subscribe(() => --this.mineCount));
    this._gameStateSubscriptions.add(this._gameStateService.tileUnflagged$.subscribe(() => ++this.mineCount));
  }

  ngOnDestroy(): void {
    this._gameStateSubscriptions.unsubscribe();
  }

  public onDifficultyChange(difficulty: DifficultyType): void {
    this.selectedDifficulty = difficulty;
    this.newGame();
  }

  public newGame(): void {
    let difficulty = this._controlPanelService.getDifficulty(this.selectedDifficulty);
    this.mineCount = difficulty.mineCount;
    this.gameStatus = GameStatus.New;
    this._gameStateService.newGame(difficulty);
  }
}
