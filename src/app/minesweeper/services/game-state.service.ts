import { Injectable } from '@angular/core';
import { Difficulty } from '../models/contracts/difficulty';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameStateService {
  private newGameSubject: Subject<Difficulty> = new Subject<Difficulty>();
  private gameOverSubject: Subject<boolean> = new Subject<boolean>();
  private tileFlagged: Subject<void> = new Subject<void>();
  private tileUnflagged: Subject<void> = new Subject<void>();

  get newGameObservable(): Observable<Difficulty> {
    return this.newGameSubject.asObservable();
  }

  get gameOverObservable(): Observable<boolean> {
    return this.gameOverSubject.asObservable();
  }

  get tileFlaggedObservable(): Observable<void> {
    return this.tileFlagged.asObservable();
  }

  get tileUnflaggedObservable(): Observable<void> {
    return this.tileUnflagged.asObservable();
  }

  public newGame(difficulty: Difficulty): void {
    this.newGameSubject.next(difficulty);
  }

  public gameOver(gameWon: boolean): void {
    this.gameOverSubject.next(gameWon);
  }

  public flagTile(): void {
    this.tileFlagged.next();
  }

  public unflagTile(): void {
    this.tileUnflagged.next();
  }
}
